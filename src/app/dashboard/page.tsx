import { auth, signOut } from "../../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login"); 
  }
  
  return (
    <main className="min-h-screen bg-[#f8f7f3] px-6 py-10 text-neutral-950">
      <section className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
              Dashboard client
            </p>
            <h1 className="mt-3 text-4xl font-semibold">
              Bonjour {session?.user?.name ?? "Client"}
            </h1>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="rounded-full bg-black px-5 py-3 text-sm text-white">
              Déconnexion
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">Audits</p>
            <p className="mt-3 text-4xl font-bold">0</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">En cours</p>
            <p className="mt-3 text-4xl font-bold">0</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">Rapports disponibles</p>
            <p className="mt-3 text-4xl font-bold">0</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Mes demandes d’audit</h2>

          <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 p-8 text-center">
            <p className="text-neutral-600">
              Vous n’avez pas encore de demande d’audit.
            </p>

            <Link
              href="/#offres"
              className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm uppercase tracking-widest text-white"
            >
              Demander un audit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
