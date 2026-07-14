export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "src/lib/admin";
import { prisma } from "src/lib/prisma";
import { checkoutSchema } from "src/lib/validations";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function updateAudit(formData: FormData) {
  "use server";

  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  const parsed = checkoutSchema.safeParse({
    offer: formData.get("offer"),
    restaurantName: formData.get("restaurantName"),
    city: formData.get("city"),
    platform: formData.get("platform"),
    marketplaceUrl: formData.get("marketplaceUrl"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    throw new Error("Données de l’audit invalides.");
  }

  await prisma.auditRequest.update({
    where: { id },
    data: parsed.data,
  });

  redirect(`/admin/audits/${id}`);
}

export default async function EditAuditPage({ params }: PageProps) {
  await requireAdmin();

  const { id } = await params;

  const audit = await prisma.auditRequest.findUnique({
    where: { id },
  });

  if (!audit) {
    notFound();
  }

  return (
    <div>
      <Link href={`/admin/audits/${audit.id}`} className="text-sm text-neutral-400">
        ← Retour à l’audit
      </Link>

      <h1 className="mt-6 text-4xl font-semibold">
        Modifier l’audit
      </h1>

      <form action={updateAudit} className="mt-10 space-y-4">
        <input type="hidden" name="id" value={audit.id} />

        <input
          name="restaurantName"
          required
          defaultValue={audit.restaurantName}
          className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-5 py-4 text-white"
        />

        <input
          name="city"
          defaultValue={audit.city ?? ""}
          placeholder="Ville"
          className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-5 py-4 text-white"
        />

        <select
          name="platform"
          defaultValue={audit.platform}
          className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-5 py-4 text-white"
        >
          <option value="UBEREATS">Uber Eats</option>
          <option value="DELIVEROO">Deliveroo</option>
          <option value="BOTH">Uber Eats + Deliveroo</option>
        </select>

        <select
          name="offer"
          defaultValue={audit.offer}
          className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-5 py-4 text-white"
        >
          <option value="SIMPLE">Audit Simple</option>
          <option value="COMPLETE">Audit Complet</option>
          <option value="MONTHLY">Accompagnement mensuel</option>
        </select>

        <input
          name="marketplaceUrl"
          type="url"
          defaultValue={audit.marketplaceUrl ?? ""}
          placeholder="Lien Uber Eats / Deliveroo"
          className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-5 py-4 text-white"
        />

        <textarea
          name="message"
          rows={6}
          defaultValue={audit.message ?? ""}
          placeholder="Message du client"
          className="w-full rounded-3xl border border-white/10 bg-neutral-950 p-5 text-white"
        />

        <button
          type="submit"
          className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
