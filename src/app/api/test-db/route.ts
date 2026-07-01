// src/app/api/test-db/route.ts
import { prisma } from "./../../../lib/prisma";

export async function GET() {
  const users = await prisma.user.count();

  return Response.json({
    ok: true,
    users,
  });
}