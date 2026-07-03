import { auth, signOut } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import { formatAuditStatus } from "src/lib/format";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/forbidden");
  }

  const [
    totalAudits,
    pendingAudits,
    inProgressAudits,
    completedAudits,
    recentAudits,
  ] = await Promise.all([
    prisma.auditRequest.count(),
    prisma.auditRequest.count({
      where: { status: "PENDING" },
    }),
    prisma.auditRequest.count({
      where: { status: "IN_PROGRESS" },
    }),
    prisma.auditRequest.count({
      where: { status: "COMPLETED" },
    }),
    prisma.auditRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      include: {
        user: true,
      },
    }),
  ]);

  const revenue = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: "paid" },
  });

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
              Admin LUMI
            </p>

            <h1 className="mt-3 text-4xl font-semibold">
              Tableau de bord
            </h1>

            <p className="mt-2 text-neutral-400">
              Connecté en tant que <strong>{session.user.email}</strong>
            </p>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90">
              Déconnexion
            </button>
          </form>
        </div>

        {/* Cards */}

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Demandes", totalAudits],
            ["En attente", pendingAudits],
            ["En cours", inProgressAudits],
            ["Terminés", completedAudits],
            ["Revenus", `${((revenue._sum.amount ?? 0) / 100).toFixed(2)}€`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm text-neutral-400">{label}</p>

              <p className="mt-4 text-5xl font-bold">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Tableau */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">
            Dernières demandes
          </h2>

          {recentAudits.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-10 text-center text-neutral-400">
              Aucune demande pour le moment.
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-white/10 text-sm uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="pb-4">Restaurant</th>
                    <th className="pb-4">Client</th>
                    <th className="pb-4">Offre</th>
                    <th className="pb-4">Statut</th>
                    <th className="pb-4">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentAudits.map((audit) => (
                    <tr
                      key={audit.id}
                      className="border-b border-white/5"
                    >
                      <td className="py-5 font-medium">
                        {audit.restaurantName}
                      </td>

                      <td>{audit.user.email}</td>

                      <td>{audit.offer}</td>

                      <td>{formatAuditStatus(audit.status)}</td>

                      <td>
                        {audit.createdAt.toLocaleDateString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
