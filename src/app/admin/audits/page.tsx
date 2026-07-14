export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "src/lib/admin";
import { formatAuditStatus } from "src/lib/format";


export default async function AdminAuditsPage() {

  await requireAdmin();

  const audits = await prisma.auditRequest.findMany({
    where: { isArchived: false },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
        Audits
      </p>

      <div className="w-full inline-flex flex-1 justify-between">
        <h1 className="mt-3 text-4xl font-semibold">Toutes les demandes</h1>
        <Link
          href="/admin/audits/archives"
          className="rounded-full border border-white/20 px-5 py-3 text-sm"
        >
          Voir les archives
        </Link>
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        {audits.length === 0 ? (
          <p className="py-10 text-center text-neutral-400">
            Aucune demande pour le moment.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-neutral-400">
                <tr>
                  <th className="py-3">Restaurant</th>
                  <th className="text-center">Client</th>
                  <th className="text-center">Offre</th>
                  <th className="text-center">Paiement</th>
                  <th className="text-center">Statut</th>
                  <th className="text-center">Date</th>
                  <th className="text-center"></th>
                </tr>
              </thead>

              <tbody>
                {audits.map((audit) => (
                  <tr key={audit.id} className="border-t border-white/10">
                    <td className="py-4 font-medium">{audit.restaurantName}</td>
                    <td className="text-center">{audit.user.email}</td>
                    <td className="text-center">{audit.offer}</td>
                    <td className="text-center">
                      <span className="rounded-full px-3 py-1 text-xs text-green-700 bg-green-100">
                        Payé
                      </span>
                    </td>
                    <td className="text-center">{formatAuditStatus(audit.status)}</td>
                    <td className="text-center">{audit.createdAt.toLocaleDateString("fr-FR")}</td>
                    <td className="text-center">
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/admin/audits/${audit.id}`}
                        className="rounded-full bg-white px-4 py-2 text-xs text-black"
                      >
                        Ouvrir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
