// src/app/admin/audits/[id]/page.tsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateStatus(formData: FormData) {
  "use server";

  const id = String(formData.get("id"));
  const status = String(formData.get("status"));

  if (!id || !status) return;

  await prisma.auditRequest.update({
    where: { id },
    data: {
      status: status as "PENDING" | "IN_PROGRESS" | "COMPLETED",
    },
  });

  redirect(`/admin/audits/${id}`);
}

async function deleteAudit(formData: FormData) {
  "use server";

  const id = String(formData.get("id"));

  await prisma.auditRequest.delete({
    where: { id },
  });

  redirect("/admin/audits");
}


export default async function AdminAuditDetailPage({ params }: PageProps) {
  const { id } = await params;

  const audit = await prisma.auditRequest.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!audit) {
    notFound();
  }

  return (
    <div>
      <Link href="/admin/audits" className="text-sm text-neutral-400">
        ← Retour aux audits
      </Link>

      <h1 className="mt-6 text-4xl font-semibold">
        {audit.restaurantName}
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Informations</h2>

          <div className="mt-6 space-y-4 text-neutral-300">
            <p><span className="text-neutral-500">Client :</span> {audit.user.email}</p>
            <p><span className="text-neutral-500">Restaurant :</span> {audit.restaurantName}</p>
            <p><span className="text-neutral-500">Ville :</span> {audit.city ?? "Non renseignée"}</p>
            <p><span className="text-neutral-500">Plateforme :</span> {audit.platform}</p>
            <p><span className="text-neutral-500">Offre :</span> {audit.offer}</p>
            <p><span className="text-neutral-500">Statut :</span> {audit.status}</p>
            <p><span className="text-neutral-500">Date :</span> {audit.createdAt.toLocaleDateString("fr-FR")}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Action admin</h2>

          <form action={updateStatus} className="mt-6 space-y-4">
            <input type="hidden" name="id" value={audit.id} />

            <select
              name="status"
              defaultValue={audit.status}
              className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-5 py-4 text-white"
            >
              <option value="PENDING">En attente</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="COMPLETED">Terminé</option>
            </select>

            <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
              Mettre à jour
            </button>
          </form>

          <form action={deleteAudit}>
            <input type="hidden" name="id" value={audit.id} />

            <button
              className="rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white"
            >
              Supprimer l’audit
            </button>
          </form>
            <Link
                href={`/admin/audits/${audit.id}/report`}
                className="mt-4 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
                >
                Creer / modifier le rapport HTML
            </Link>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold">Lien marketplace</h2>

        {audit.marketplaceUrl ? (
          <a
            href={audit.marketplaceUrl}
            target="_blank"
            className="mt-4 inline-block text-neutral-300 underline"
          >
            Ouvrir la fiche restaurant
          </a>
        ) : (
          <p className="mt-4 text-neutral-400">Aucun lien fourni.</p>
        )}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold">Message client</h2>

        <p className="mt-4 whitespace-pre-line text-neutral-300">
          {audit.message || "Aucun message."}
        </p>
      </div>
    </div>
  );
}
