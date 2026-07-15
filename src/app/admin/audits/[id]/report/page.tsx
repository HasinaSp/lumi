export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

  const auditId = String(formData.get("auditId") ?? "");
  const intent = String(formData.get("intent") ?? "draft");
  const shouldPublish = intent === "publish";

  if (!auditId) {
    throw new Error("Identifiant de l’audit manquant.");
  }

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
    console.error(
      "Validation du rapport échouée :",
      parsed.error.flatten()
    );

    throw new Error("Données du rapport invalides.");
  }

  const existingAudit = await prisma.auditRequest.findUnique({
    where: { id: auditId },
    include: {
      user: true,
      report: true,
    },
  });

  if (!existingAudit) {
    throw new Error("Audit introuvable.");
  }

  const wasAlreadyPublished =
    existingAudit.report?.isPublished === true;

  const reportData = parsed.data;

  await prisma.auditReport.upsert({
    where: { auditId },

    update: {
      ...reportData,

      // Un brouillon ne dépublie pas un rapport déjà publié.
      ...(shouldPublish
        ? {
            isPublished: true,
            publishedAt:
              existingAudit.report?.publishedAt ?? new Date(),
          }
        : {}),
    },

    create: {
      auditId,
      ...reportData,
      isPublished: shouldPublish,
      publishedAt: shouldPublish ? new Date() : null,
    },
  });

  if (shouldPublish) {
    await prisma.auditRequest.update({
      where: { id: auditId },
      data: {
        status: "COMPLETED",
      },
    });
  }

  // Email envoyé uniquement lors de la première publication.
  if (
    shouldPublish &&
    !wasAlreadyPublished &&
    existingAudit.user.email
  ) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!appUrl) {
      console.error(
        "NEXT_PUBLIC_APP_URL manquant : email non envoyé."
      );
    } else {
      const html = await render(
        <AuditCompletedEmail
          clientName={existingAudit.user.name ?? "Client"}
          restaurantName={existingAudit.restaurantName}
          reportUrl={`${appUrl}/dashboard/audits/${existingAudit.id}`}
        />
      );

      const emailResult = await resend.emails.send({
        from: "LUMI <audit@lumi-hikari.com>",
        to: existingAudit.user.email,
        subject: "Votre rapport LUMI est disponible",
        html,
      });

      if (emailResult.error) {
        console.error(
          "Erreur lors de l’envoi Resend :",
          emailResult.error
        );
      }
    }
  }

  revalidatePath(`/admin/audits/${auditId}`);
  revalidatePath(`/admin/audits/${auditId}/report`);
  revalidatePath(`/dashboard/audits/${auditId}`);
  revalidatePath("/dashboard");

  if (shouldPublish) {
    redirect(`/admin/audits/${auditId}`);
  }

  redirect(`/admin/audits/${auditId}/report`);
}

export default async function AdminAuditReportPage({
  params,
}: PageProps) {
  await requireAdmin();

  const { id } = await params;

  const audit = await prisma.auditRequest.findUnique({
    where: { id },
    include: {
      report: true,
    },
  });

  if (!audit) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/admin/audits/${id}`}
          className="text-sm text-neutral-400"
        >
          ← Retour à l’audit
        </Link>

        {audit.report && (
          <Link
            href={`/dashboard/audits/${audit.id}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-5 py-2 text-center text-sm"
          >
            Prévisualiser
          </Link>
        )}
      </div>

      <div className="mt-6">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          {audit.report?.isPublished
            ? "Rapport publié"
            : "Brouillon"}
        </p>

        <h1 className="mt-3 text-4xl font-semibold">
          Rapport — {audit.restaurantName}
        </h1>

        {audit.report?.publishedAt && (
          <p className="mt-2 text-sm text-neutral-400">
            Publié le{" "}
            {audit.report.publishedAt.toLocaleDateString("fr-FR")}
          </p>
        )}
      </div>

      <form action={saveReport} className="mt-10 space-y-6">
        <input
          type="hidden"
          name="auditId"
          value={audit.id}
        />

        <div className="grid gap-4 md:grid-cols-5">
          {[
            ["scoreGlobal", "Global"],
            ["photosScore", "Photos"],
            ["menuScore", "Menu"],
            ["pricingScore", "Prix"],
            ["seoScore", "Visibilité"],
          ].map(([name, label]) => (
            <label key={name} className="block">
              <span className="text-sm text-neutral-400">
                {label}
              </span>

              <input
                name={name}
                type="number"
                min={0}
                max={100}
                required
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
          <label
            key={name}
            className="block"
            htmlFor={name}
          >
            <span className="text-sm text-neutral-400">
              {label}
            </span>

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

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            name="intent"
            value="draft"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium"
          >
            Enregistrer le brouillon
          </button>

          <button
            type="submit"
            name="intent"
            value="publish"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
          >
            {audit.report?.isPublished
              ? "Mettre à jour le rapport publié"
              : "Publier le rapport"}
          </button>
        </div>
      </form>
    </div>
  );
}
