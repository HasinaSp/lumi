// src/app/api/webhooks/lemon-squeezy/route.ts
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "src/lib/prisma";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (hmac !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  const eventName = event.meta?.event_name;

  if (eventName !== "order_created") {
    return NextResponse.json({ received: true });
  }

  const orderId = String(event.data.id);
  const attributes = event.data.attributes;
  const custom = event.meta?.custom_data;

  if (!custom?.userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const existingPayment = await prisma.payment.findUnique({
    where: {
      providerOrderId: orderId,
    },
  });

  if (existingPayment) {
    return NextResponse.json({ received: true });
  }

  const payment = await prisma.payment.create({
    data: {
      provider: "lemonsqueezy",
      providerOrderId: orderId,
      amount: attributes.total,
      currency: attributes.currency,
      status: attributes.status,
      offer: custom.offer,
      userId: custom.userId,
      restaurantName: custom.restaurantName,
      city: custom.city,
      platform: custom.platform,
      marketplaceUrl: custom.marketplaceUrl,
      message: custom.message,
    },
  });

  await prisma.auditRequest.create({
    data: {
      userId: custom.userId,
      restaurantName: custom.restaurantName,
      city: custom.city,
      platform: custom.platform,
      offer: custom.offer,
      marketplaceUrl: custom.marketplaceUrl,
      message: custom.message,
    },
  });

  console.log("Paiement créé :", payment.id);

  return NextResponse.json({ received: true });
}