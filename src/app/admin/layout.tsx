// src/app/admin/layout.tsx
import Link from "next/link";
import { auth, signOut } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 p-6">
          <Link href="/" className="text-2xl font-semibold tracking-[0.25em]">
            <span className="inline-flex flex-1 gap-2 justify-center font-bold text-white">            
                <img src="/lumi-logo/lumi-logo-dark-vector.svg" alt="logo" className="h-12 w-12" />
                LUMI
            </span>
          </Link>

          <nav className="mt-10 space-y-2">
            <Link className="block rounded-2xl bg-white/10 px-4 py-3" href="/admin">
              Dashboard
            </Link>
            <Link className="block rounded-2xl px-4 py-3 text-neutral-400 hover:bg-white/10 hover:text-white" href="/admin/audits">
              Audits
            </Link>
            <Link className="block rounded-2xl px-4 py-3 text-neutral-400 hover:bg-white/10 hover:text-white" href="/admin/clients">
              Clients
            </Link>
          </nav>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
            className="mt-10"
          >
            <button className="rounded-full bg-white px-5 py-3 text-sm text-black">
              Déconnexion
            </button>
          </form>
        </aside>

        <section className="p-6 md:p-10">{children}</section>
      </div>
    </main>
  );
}
