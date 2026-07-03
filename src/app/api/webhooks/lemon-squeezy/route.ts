import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();

  console.log("Webhook reçu !");
  console.log(body);

  return NextResponse.json({ success: true });
}