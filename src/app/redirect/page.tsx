// src/app/redirect/page.tsx
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.email === process.env.ADMIN_EMAIL) {
    redirect("/admin");
  }

  redirect("/dashboard");
}
