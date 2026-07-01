// src/app/admin/audits/[id]/report/page.tsx
import { prisma } from "../../../../../lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function saveReport(formData: FormData) {
  "use server";

  const id = String(formData.get("id"));
  const htmlReport = String(formData.get("htmlReport"));

  await prisma.auditRequest.update({
    where: { id },
    data: {
      htmlReport,
      status: "COMPLETED",
    },
  });

  redirect(`/admin/audits/${id}`);
}

export default async function AuditReportPage({ params }: PageProps) {
  const { id } = await params;

  const audit = await prisma.auditRequest.findUnique({
    where: { id },
  });

  if (!audit) notFound();

  return (
    <div>
      <Link href={`/admin/audits/${id}`} className="text-sm text-neutral-400">
        ← Retour
      </Link>

      <h1 className="mt-6 text-4xl font-semibold">
        Rapport HTML — {audit.restaurantName}
      </h1>

      <form action={saveReport} className="mt-8 space-y-4">
        <input type="hidden" name="id" value={audit.id} />

        <textarea
          name="htmlReport"
          defaultValue={audit.htmlReport ?? ""}
          rows={25}
          className="w-full rounded-3xl border border-white/10 bg-neutral-950 p-6 font-mono text-sm text-white"
          placeholder="Collez ici le rapport HTML..."
        />

        <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
          Enregistrer le rapport
        </button>
      </form>
    </div>
  );
}
