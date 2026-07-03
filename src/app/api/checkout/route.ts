import { NextRequest, NextResponse } from "next/server";
import { auth } from "src/lib/auth";
import { prisma } from "src/lib/prisma";
import {
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";
import "src/lib/lemonsqueezy";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const offer = body.offer as "SIMPLE" | "COMPLETE" | "MONTHLY";

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email.toLowerCase(),
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const variantId =
    offer === "SIMPLE"
      ? Number(process.env.LEMONSQUEEZY_VARIANT_SIMPLE)
      : offer === "COMPLETE"
      ? Number(process.env.LEMONSQUEEZY_VARIANT_COMPLETE)
      : Number(process.env.LEMONSQUEEZY_VARIANT_MONTHLY);

  const checkout = await createCheckout(
    Number(process.env.LEMONSQUEEZY_STORE_ID),
    variantId,
    {
      checkoutOptions: {
        embed: false,
      },

      checkoutData: {
        email: user.email,

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

      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      },
    }
  );

  const url =
    checkout.data?.data.attributes.url;

  return NextResponse.json({
    url,
  });
}