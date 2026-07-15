// src/app/api/webhooks/lemon-squeezy/route.ts

import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "src/lib/prisma";

export const runtime = "nodejs";

const customDataSchema = z.object({
  userId: z.string().min(1),
  offer: z.enum(["SIMPLE", "COMPLETE", "MONTHLY"]),
  restaurantName: z.string().trim().min(2).max(100),
  city: z.string().trim().max(100).optional().nullable(),
  platform: z.enum(["UBEREATS", "DELIVEROO", "BOTH"]),
  marketplaceUrl: z
    .string()
    .trim()
    .url()
    .optional()
    .nullable()
    .or(z.literal("")),
  message: z.string().trim().max(1000).optional().nullable(),
});

const webhookSchema = z.object({
  meta: z.object({
    event_name: z.string(),
    custom_data: z.unknown().optional(),
  }),
  data: z.object({
    id: z.union([z.string(), z.number()]),
    attributes: z.object({
      total: z.number(),
      currency: z.string(),
      status: z.string(),
    }),
  }),
});

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json(
      { error: "Signature ou secret manquant." },
      { status: 400 }
    );
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  const receivedBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return NextResponse.json(
      { error: "Signature invalide." },
      { status: 401 }
    );
  }

  let json: unknown;

  try {
    json = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { error: "Corps JSON invalide." },
      { status: 400 }
    );
  }

  const parsedWebhook = webhookSchema.safeParse(json);

  if (!parsedWebhook.success) {
    console.error(
      "Payload Lemon Squeezy invalide :",
      parsedWebhook.error.flatten()
    );

    return NextResponse.json(
      { error: "Payload invalide." },
      { status: 400 }
    );
  }

  const { meta, data } = parsedWebhook.data;

  if (meta.event_name !== "order_created") {
    return NextResponse.json({ received: true });
  }

  const parsedCustomData = customDataSchema.safeParse(meta.custom_data);

  if (!parsedCustomData.success) {
    console.error(
      "Custom data invalide :",
      parsedCustomData.error.flatten(),
      meta.custom_data
    );

    return NextResponse.json(
      { error: "Données personnalisées invalides." },
      { status: 400 }
    );
  }

  const custom = parsedCustomData.data;
  const providerOrderId = String(data.id);

  const userExists = await prisma.user.findUnique({
    where: { id: custom.userId },
    select: { id: true },
  });

  if (!userExists) {
    console.error("Utilisateur introuvable :", custom.userId);

    return NextResponse.json(
      { error: "Utilisateur introuvable." },
      { status: 404 }
    );
  }

  const existingPayment = await prisma.payment.findUnique({
    where: { providerOrderId },
  });

  if (existingPayment) {
    return NextResponse.json({
      received: true,
      duplicate: true,
    });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          provider: "lemonsqueezy",
          providerOrderId,
          amount: data.attributes.total,
          currency: data.attributes.currency,
          status: data.attributes.status,
          offer: custom.offer,
          userId: custom.userId,
          restaurantName: custom.restaurantName,
          city: custom.city || null,
          platform: custom.platform,
          marketplaceUrl: custom.marketplaceUrl || null,
          message: custom.message || null,
        },
      });

      const audit = await tx.auditRequest.create({
        data: {
          userId: custom.userId,
          restaurantName: custom.restaurantName,
          city: custom.city || null,
          platform: custom.platform,
          offer: custom.offer,
          marketplaceUrl: custom.marketplaceUrl || null,
          message: custom.message || null,
          status: "PENDING",
        },
      });

      return { payment, audit };
    });

    console.log("Commande Lemon Squeezy traitée :", {
      providerOrderId,
      paymentId: result.payment.id,
      auditId: result.audit.id,
    });

    return NextResponse.json({
      received: true,
      paymentId: result.payment.id,
      auditId: result.audit.id,
    });
  } catch (error) {
    console.error("Erreur Prisma dans le webhook :", error);

    return NextResponse.json(
      { error: "Échec de la création du paiement et de l’audit." },
      { status: 500 }
    );
  }
}