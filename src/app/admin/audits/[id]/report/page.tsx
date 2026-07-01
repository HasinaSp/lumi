// src/app/admin/audits/[id]/report/page.tsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function saveReport(formData: FormData) {
  "use server";

  const auditId = String(formData.get("auditId"));

  await prisma.auditReport.upsert({
    where: { auditId },
    update: {
      scoreGlobal: Number(formData.get("scoreGlobal")),
      photosScore: Number(formData.get("photosScore")),
      menuScore: Number(formData.get("menuScore")),
      pricingScore: Number(formData.get("pricingScore")),
      seoScore: Number(formData.get("seoScore")),
      summary: String(formData.get("summary") ?? ""),
      strengths: String(formData.get("strengths") ?? ""),
      improvements: String(formData.get("improvements") ?? ""),
      recommendations: String(formData.get("recommendations") ?? ""),
    },
    create: {
      auditId,
      scoreGlobal: Number(formData.get("scoreGlobal")),
      photosScore: Number(formData.get("photosScore")),
      menuScore: Number(formData.get("menuScore")),
      pricingScore: Number(formData.get("pricingScore")),
      seoScore: Number(formData.get("seoScore")),
      summary: String(formData.get("summary") ?? ""),
      strengths: String(formData.get("strengths") ?? ""),
      improvements: String(formData.get("improvements") ?? ""),
      recommendations: String(formData.get("recommendations") ?? ""),
    },
  });

  await prisma.auditRequest.update({
    where: { id: auditId },
    data: { status: "COMPLETED" },
  });

  redirect(`/admin/audits/${auditId}`);
}

export default async function AdminAuditReportPage({ params }: PageProps) {
  const { id } = await params;

  const audit = await prisma.auditRequest.findUnique({
    where: { id },
    include: { report: true },
  });

  if (!audit) notFound();

  return (
    <div>
      <Link href={`/admin/audits/${id}`} className="text-sm text-neutral-400">
        ← Retour à l’audit
      </Link>

      <h1 className="mt-6 text-4xl font-semibold">
        Rapport — {audit.restaurantName}
      </h1>

      <form action={saveReport} className="mt-10 space-y-6">
        <input type="hidden" name="auditId" value={audit.id} />

        <div className="grid gap-4 md:grid-cols-5">
          {[
            ["scoreGlobal", "Global"],
            ["photosScore", "Photos"],
            ["menuScore", "Menu"],
            ["pricingScore", "Prix"],
            ["seoScore", "Visibilité"],
          ].map(([name, label]) => (
            <label key={name} className="block">
              <span className="text-sm text-neutral-400">{label}</span>
              <input
                name={name}
                type="number"
                min="0"
                max="100"
                defaultValue={
                  audit.report?.[name as keyof typeof audit.report] as number ?? 0
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white"
              />
            </label>
          ))}
        </div>

        {[
          ["summary", "Résumé"],
          ["strengths", "Points forts"],
          ["improvements", "Axes d’amélioration"],
          ["recommendations", "Recommandations"],
        ].map(([name, label]) => (
          <label key={name} className="block">
            <span className="text-sm text-neutral-400">{label}</span>
            <textarea
              name={name}
              rows={6}
              defaultValue={
                (audit.report?.[name as keyof typeof audit.report] as string) ?? ""
              }
              className="mt-2 w-full rounded-3xl border border-white/10 bg-neutral-950 p-5 text-white"
            />
          </label>
        ))}

        <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
          Enregistrer le rapport
        </button>
      </form>
    </div>
  );
}