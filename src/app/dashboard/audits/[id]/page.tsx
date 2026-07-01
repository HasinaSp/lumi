// src/app/dashboard/audits/[id]/page.tsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

function scoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Bon";
  if (score >= 40) return "À améliorer";
  return "Critique";
}

export default async function ClientAuditDetailPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const { id } = await params;

  const audit = await prisma.auditRequest.findUnique({
    where: { id },
    include: {
      user: true,
      report: true,
    },
  });

  if (!audit) notFound();

  if (audit.user.email !== session.user.email.toLowerCase()) {
    redirect("/forbidden");
  }

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-6 py-10 text-neutral-950">
      <section className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-sm text-neutral-500">
          ← Retour au dashboard
        </Link>

        <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            Rapport LUMI
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            {audit.restaurantName}
          </h1>

          <p className="mt-2 text-neutral-500">
            {audit.offer} · {audit.platform}
          </p>

          {!audit.report ? (
            <div className="mt-10 rounded-3xl border border-dashed border-neutral-300 p-10 text-center">
              <h2 className="text-2xl font-semibold">
                Rapport pas encore disponible
              </h2>
              <p className="mt-3 text-neutral-600">
                Votre audit est en cours de préparation.
              </p>
            </div>
          ) : (
            <div className="mt-10">
              <div className="rounded-3xl bg-black p-8 text-white">
                <p className="text-sm uppercase tracking-widest text-neutral-400">
                  Score global
                </p>

                <div className="mt-4 flex items-end gap-3">
                  <span className="text-7xl text-orange-500 font-bold">
                    {audit.report.scoreGlobal}
                  </span>
                  <span className="pb-2 text-2xl text-neutral-400">/100</span>
                </div>

                <p className="mt-4 text-lg text-pink-300">
                  {scoreLabel(audit.report.scoreGlobal)}
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-4">
                {[
                  ["Photos", audit.report.photosScore],
                  ["Menu", audit.report.menuScore],
                  ["Prix", audit.report.pricingScore],
                  ["Visibilité", audit.report.seoScore],
                ].map(([label, score]) => (
                  <div key={label} className="rounded-3xl border p-5">
                    <p className="text-sm text-neutral-500">{label}</p>
                    <p className="mt-2 text-3xl text-emerald-500 font-bold">{score}/100</p>
                  </div>
                ))}
              </div>

              {[
                ["Résumé", audit.report.summary],
                ["Points forts", audit.report.strengths],
                ["Axes d’amélioration", audit.report.improvements],
                ["Recommandations", audit.report.recommendations],
              ].map(([title, content]) => (
                <div key={title} className="mt-8 rounded-3xl border p-6">
                  <h2 className="text-2xl font-semibold">{title}</h2>
                  <p className="mt-4 whitespace-pre-line text-neutral-700">
                    {content || "Non renseigné."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}