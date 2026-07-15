import { NextResponse } from "next/server";
import { z } from "zod";

const localeSchema = z.object({
  locale: z.enum(["fr", "en"]),
});

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = localeSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid locale" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    locale: parsed.data.locale,
  });

  response.cookies.set(
    "LUMI_LOCALE",
    parsed.data.locale,
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    }
  );

  return response;
}