export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { render } from "@react-email/components";

import { requireAdmin } from "src/lib/admin";
import { prisma } from "src/lib/prisma";
import { resend } from "src/lib/resend";
import { auditReportSchema } from "src/lib/validations";
import AuditCompletedEmail from "src/emails/AuditCompletedEmail";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function saveReport(formData: FormData) {
  "use server";

  await requireAdmin();

  const auditId = String(formData.get("auditId"));

  const parsed = auditReportSchema.safeParse({
    scoreGlobal: formData.get("scoreGlobal"),
    photosScore: formData.get("photosScore"),
    menuScore: formData.get("menuScore"),
    pricingScore: formData.get("pricingScore"),
    seoScore: formData.get("seoScore"),
    summary: formData.get("summary"),
    strengths: formData.get("strengths"),
    improvements: formData.get("improvements"),
    recommendations: formData.get("recommendations"),
  });

  if (!parsed.success) {
    throw new Error("Données du rapport invalides.");
  }

  const data = parsed.data;

  const existingAudit = await prisma.auditRequest.findUnique({
    where: { id: auditId },
    include: {
      user: true,
      report: true,
    },
  });

  if (!existingAudit) {
    throw new Error("Audit introuvable");
  }

  await prisma.auditReport.upsert({
    where: { auditId },
    update: data,
    create: {
      auditId,
      ...data,
    },
  });

  await prisma.auditRequest.update({
    where: { id: auditId },
    data: { status: "COMPLETED" },
  });

  if (!existingAudit.report && existingAudit.user.email) {
    const html = await render(
      <AuditCompletedEmail
        clientName={existingAudit.user.name ?? "Client"}
        restaurantName={existingAudit.restaurantName}
        reportUrl={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/audits/${existingAudit.id}`}
      />
    );

    await resend.emails.send({
      from: "LUMI <audit@lumi-hikari.com>",
      to: existingAudit.user.email,
      subject: "Votre rapport LUMI est disponible",
      html,
    });
  }

  redirect(`/admin/audits/${auditId}`);
}

export default async function AdminAuditReportPage({ params }: PageProps) {
  await requireAdmin();

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
                  (audit.report?.[
                    name as keyof typeof audit.report
                  ] as number) ?? 0
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
          <label key={name} className="block" htmlFor={name}>
            <span className="text-sm text-neutral-400">{label}</span>
            <textarea
              id={name}
              name={name}
              rows={6}
              defaultValue={
                (audit.report?.[
                  name as keyof typeof audit.report
                ] as string) ?? ""
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
