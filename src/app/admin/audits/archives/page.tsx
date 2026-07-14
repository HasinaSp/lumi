export const dynamic = "force-dynamic";

import Link from "next/link";
import { requireAdmin } from "src/lib/admin";
import { prisma } from "src/lib/prisma";

export default async function ArchivedAuditsPage() {
  await requireAdmin();

  const audits = await prisma.auditRequest.findMany({
    where: {
      isArchived: true,
    },
    orderBy: {
      archivedAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      <Link href="/admin/audits" className="text-sm text-neutral-400">
        ← Retour aux audits
      </Link>

      <h1 className="mt-6 text-4xl font-semibold">
        Audits archivés
      </h1>

      <div className="mt-10 space-y-4">
        {audits.length === 0 ? (
          <p className="text-neutral-400">
            Aucun audit archivé.
          </p>
        ) : (
          audits.map((audit) => (
            <div
              key={audit.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 p-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="font-semibold">
                  {audit.restaurantName}
                </h2>

                <p className="mt-1 text-sm text-neutral-400">
                  {audit.user.email} · {audit.offer}
                </p>
              </div>

              <Link
                href={`/admin/audits/${audit.id}`}
                className="rounded-full bg-white px-4 py-2 text-center text-sm text-black"
              >
                Ouvrir
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
