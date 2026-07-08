import { redirect } from "next/navigation";
import { auth } from "src/lib/auth";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/forbidden");
  }

  return session;
}
