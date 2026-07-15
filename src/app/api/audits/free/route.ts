// src/app/api/audits/free/route.ts

import { NextResponse } from "next/server";

import { auth } from "src/lib/auth";
import { prisma } from "src/lib/prisma";
import { checkoutSchema } from "src/lib/validations";
import { rateLimit } from "src/lib/rate-limit";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Vous devez être connecté." },
      { status: 401 }
    );
  }

  if (!rateLimit(`free-audit:${session.user.email}`, 3, 60_000)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans une minute." },
      { status: 429 }
    );
  }

  const json = await request.json();

  const parsed = checkoutSchema.safeParse({
    ...json,
    offer: "SIMPLE",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Les informations envoyées sont invalides." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email.toLowerCase(),
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur introuvable." },
      { status: 404 }
    );
  }

  // Une seule offre gratuite par compte pendant le lancement.
  const existingFreeAudit = await prisma.auditRequest.findFirst({
    where: {
      userId: user.id,
      offer: "SIMPLE",
    },
  });

  if (existingFreeAudit) {
    return NextResponse.json(
      {
        error:
          "Vous avez déjà bénéficié de l’audit découverte gratuit.",
      },
      { status: 409 }
    );
  }

  const data = parsed.data;

  const audit = await prisma.auditRequest.create({
    data: {
      userId: user.id,
      restaurantName: data.restaurantName,
      city: data.city || null,
      platform: data.platform,
      offer: "SIMPLE",
      marketplaceUrl: data.marketplaceUrl || null,
      message: data.message || null,
      status: "PENDING",
    },
  });

  return NextResponse.json(
    {
      success: true,
      auditId: audit.id,
    },
    { status: 201 }
  );
}