import { NextResponse } from "next/server";
import { auth } from "src/lib/auth";
import { rateLimit } from "src/lib/rate-limit";
import { prisma } from "src/lib/prisma";
import { checkoutSchema } from "src/lib/validations";

function getVariantId(offer: string) {
  if (offer === "COMPLETE") return process.env.LEMONSQUEEZY_VARIANT_COMPLETE!;
  if (offer === "MONTHLY") return process.env.LEMONSQUEEZY_VARIANT_MONTHLY!;
  return process.env.LEMONSQUEEZY_VARIANT_SIMPLE!;
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = session?.user?.email ?? "anonymous";

  if (!rateLimit(key, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const requestBody = await req.json();
  const parsed = checkoutSchema.safeParse(requestBody);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides" },
      { status: 400 }
    );
  }

  const body = parsed.data;
  const offer = body.offer;
  const variantId = getVariantId(offer);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!appUrl) {
        return NextResponse.json(
            { error: "App URL not configured" }, 
            { status: 500 });
  }

  const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
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
            redirect_url: `${appUrl}/dashboard`,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: String(process.env.LEMONSQUEEZY_STORE_ID),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: String(variantId),
            },
          },
        },
      },
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    console.error("Lemon checkout error:", json);
    return NextResponse.json({ error: "Checkout error", details: json }, { status: 500 });
  }

  return NextResponse.json({
    url: json.data.attributes.url,
  });
}