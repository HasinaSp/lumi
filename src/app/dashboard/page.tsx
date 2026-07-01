// src/app/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
    include: {
      auditRequests: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
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
              Bonjour {user.name ?? "Client"}
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
            <p className="mt-3 text-4xl font-bold">{user.auditRequests.length}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">En cours</p>
            <p className="mt-3 text-4xl font-bold">
              {user.auditRequests.filter((a) => a.status === "IN_PROGRESS").length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">Terminés</p>
            <p className="mt-3 text-4xl font-bold">
              {user.auditRequests.filter((a) => a.status === "COMPLETED").length}
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Mes demandes d’audit</h2>

          {user.auditRequests.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 p-8 text-center">
              <p className="text-neutral-600">
                Vous n’avez pas encore de demande d’audit.
              </p>

              <Link
                href="/audit/new"
                className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm uppercase tracking-widest text-white"
              >
                Demander un audit
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {user.auditRequests.map((audit) => (
                <div
                  key={audit.id}
                  className="rounded-2xl border border-neutral-200 p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {audit.restaurantName}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {audit.offer} · {audit.platform} ·{" "}
                        {audit.createdAt.toLocaleDateString("fr-FR")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm">
                        {audit.status}
                      </span>

                      <Link
                        href={`/dashboard/audits/${audit.id}`}
                        className="rounded-full bg-black px-5 py-2 text-sm text-white transition hover:bg-neutral-800"
                      >
                        Voir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
