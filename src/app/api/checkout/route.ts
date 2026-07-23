import { NextResponse } from "next/server";
import { auth } from "src/lib/auth";
import { rateLimit } from "src/lib/rate-limit";
import { prisma } from "src/lib/prisma";
import { checkoutSchema } from "src/lib/validations";

type PaidOffer = "COMPLETE" | "MONTHLY";

function isPaidOffer(offer: string): offer is PaidOffer {
  return offer === "COMPLETE" || offer === "MONTHLY";
}

function getVariantId(offer: PaidOffer): string | undefined {
  if (offer === "COMPLETE") {
    return process.env.LEMONSQUEEZY_VARIANT_COMPLETE;
  }

  return process.env.LEMONSQUEEZY_VARIANT_MONTHLY;
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const normalizedEmail = session.user.email.toLowerCase().trim();
    const rateLimitKey = `checkout:${normalizedEmail}`;

    if (!rateLimit(rateLimitKey, 5, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let requestBody: unknown;

    try {
      requestBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const parsed = checkoutSchema.safeParse(requestBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const body = parsed.data;
    const offer = body.offer;

    /*
     * L'offre SIMPLE est gratuite.
     * Elle ne doit donc pas passer par Lemon Squeezy.
     */
    if (!isPaidOffer(offer)) {
      return NextResponse.json(
        {
          error: "Cette offre ne nécessite pas de paiement",
        },
        { status: 400 }
      );
    }

    const variantId = getVariantId(offer);
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!apiKey || !storeId || !variantId || !appUrl) {
      console.error("Lemon Squeezy configuration incomplete", {
        offer,
        hasApiKey: Boolean(apiKey),
        storeId: storeId ?? null,
        variantId: variantId ?? null,
        appUrl: appUrl ?? null,
      });

      return NextResponse.json(
        {
          error: "Checkout configuration incomplete",
        },
        { status: 500 }
      );
    }

    const normalizedAppUrl = appUrl.replace(/\/+$/, "");

    const checkoutPayload = {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: user.email,
            name: user.name ?? undefined,
            custom: {
              userId: user.id,
              offer,
              restaurantName: body.restaurantName,
              city: body.city,
              platform: body.platform,
              marketplaceUrl: body.marketplaceUrl,
              message: body.message,
            },
          },
          product_options: {
            redirect_url: `${normalizedAppUrl}/dashboard?payment=success`,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeId,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: variantId,
            },
          },
        },
      },
    };

    const lemonResponse = await fetch(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(checkoutPayload),
        cache: "no-store",
      }
    );

    const responseText = await lemonResponse.text();

    let lemonData: unknown;

    try {
      lemonData = responseText ? JSON.parse(responseText) : null;
    } catch {
      lemonData = responseText;
    }

    if (!lemonResponse.ok) {
      console.error(
        "Lemon checkout error:",
        JSON.stringify(
          {
            status: lemonResponse.status,
            statusText: lemonResponse.statusText,
            offer,
            storeId,
            variantId,
            response: lemonData,
          },
          null,
          2
        )
      );

      return NextResponse.json(
        {
          error: "Checkout error",
          details: lemonData,
        },
        { status: 502 }
      );
    }

    const checkoutUrl =
      typeof lemonData === "object" &&
      lemonData !== null &&
      "data" in lemonData &&
      typeof lemonData.data === "object" &&
      lemonData.data !== null &&
      "attributes" in lemonData.data &&
      typeof lemonData.data.attributes === "object" &&
      lemonData.data.attributes !== null &&
      "url" in lemonData.data.attributes &&
      typeof lemonData.data.attributes.url === "string"
        ? lemonData.data.attributes.url
        : null;

    if (!checkoutUrl) {
      console.error(
        "Lemon Squeezy returned no checkout URL:",
        JSON.stringify(lemonData, null, 2)
      );

      return NextResponse.json(
        {
          error: "Checkout URL missing",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      url: checkoutUrl,
    });
  } catch (error) {
    console.error("Unexpected checkout error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}