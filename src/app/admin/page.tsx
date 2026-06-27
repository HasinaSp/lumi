import { auth, signOut } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login"); 
  }

  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }
  
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
              Admin LUMI
            </p>
            <h1 className="mt-3 text-4xl font-semibold">
              Tableau de bord admin
            </h1>
            <p className="mt-2 text-neutral-400">{session?.user?.email}</p>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="rounded-full bg-white px-5 py-3 text-sm text-black">
              Déconnexion
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Demandes", "0"],
            ["En attente", "0"],
            ["En cours", "0"],
            ["Terminés", "0"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-white/10 p-6">
              <p className="text-sm text-neutral-400">{label}</p>
              <p className="mt-3 text-4xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-white/10 p-8">
          <h2 className="text-2xl font-semibold">Demandes récentes</h2>

          <div className="mt-6 rounded-2xl border border-white/10 p-8 text-center text-neutral-400">
            Aucune demande pour le moment.
          </div>
        </div>
      </section>
    </main>
  );
}
