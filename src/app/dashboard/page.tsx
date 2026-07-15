// src/app/dashboard/page.tsx

export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "src/lib/auth";
import { prisma } from "src/lib/prisma";
import {
  auditStatusClass,
  formatAuditStatus,
} from "src/lib/format";

function formatOffer(offer: string) {
  const labels: Record<string, string> = {
    SIMPLE: "Audit Simple",
    COMPLETE: "Audit Complet",
    MONTHLY: "Accompagnement mensuel",
  };

  return labels[offer] ?? offer;
}

function formatPlatform(platform: string) {
  const labels: Record<string, string> = {
    UBEREATS: "Uber Eats",
    DELIVEROO: "Deliveroo",
    BOTH: "Uber Eats + Deliveroo",
  };

  return labels[platform] ?? platform;
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email.toLowerCase(),
    },
    include: {
      auditRequests: {
        where: {
          isArchived: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          report: true,
        },
      },
      payments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const totalAudits = user.auditRequests.length;

  const auditsInProgress = user.auditRequests.filter(
    (audit) =>
      audit.status === "PENDING" ||
      audit.status === "IN_PROGRESS"
  ).length;

  const publishedReports = user.auditRequests.filter(
    (audit) => audit.report?.isPublished
  ).length;

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-4 py-6 text-neutral-950 sm:px-6 sm:py-10">
      <section className="mx-auto max-w-6xl">
        {/* Header */}

        <header className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? user.email}
                  width={64}
                  height={64}
                  priority
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xl font-semibold">
                  {(user.name ?? user.email)
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Espace client LUMI
                </p>

                <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                  Bonjour {user.name ?? "Client"}
                </h1>

                <p className="mt-1 text-sm text-neutral-500">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#offres"
                className="rounded-full bg-black px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Demander un nouvel audit
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({
                    redirectTo: "/",
                  });
                }}
              >
                <button
                  type="submit"
                  className="w-full rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium transition hover:bg-neutral-100"
                >
                  Déconnexion
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Statistiques */}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">
              Total des audits
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {totalAudits}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">
              En préparation
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {auditsInProgress}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">
              Rapports disponibles
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {publishedReports}
            </p>
          </div>
        </div>

        {/* Audits */}

        <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Suivi
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Mes demandes d’audit
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              Suivez l’avancement de vos audits et consultez
              vos rapports publiés.
            </p>
          </div>

          {user.auditRequests.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-neutral-300 px-6 py-12 text-center">
              <h3 className="text-xl font-semibold">
                Aucun audit pour le moment
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600">
                Choisissez une offre pour lancer votre premier
                audit Uber Eats ou Deliveroo.
              </p>

              <Link
                href="/#offres"
                className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
              >
                Découvrir les offres
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {user.auditRequests.map((audit) => {
                const reportIsPublished =
                  audit.report?.isPublished === true;

                const matchingPayment =
                  user.payments.find(
                    (payment) =>
                      payment.offer === audit.offer &&
                      payment.restaurantName ===
                        audit.restaurantName
                  );

                const paymentConfirmed =
                  matchingPayment?.status === "paid";

                return (
                  <article
                    key={audit.id}
                    className="rounded-3xl border border-neutral-200 p-5 transition hover:border-neutral-300 sm:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold">
                            {audit.restaurantName}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${auditStatusClass(
                              audit.status
                            )}`}
                          >
                            {reportIsPublished
                              ? "Rapport disponible"
                              : formatAuditStatus(
                                  audit.status
                                )}
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-neutral-500">
                          {formatOffer(audit.offer)}
                          {" · "}
                          {formatPlatform(audit.platform)}
                          {" · "}
                          {audit.createdAt.toLocaleDateString(
                            "fr-FR"
                          )}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {paymentConfirmed ? (
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                              Paiement confirmé
                            </span>
                          ) : (
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                              Paiement à vérifier
                            </span>
                          )}

                          {audit.city && (
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                              {audit.city}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                        <Link
                          href={`/dashboard/audits/${audit.id}`}
                          className={
                            reportIsPublished
                              ? "rounded-full bg-black px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-neutral-800"
                              : "rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-medium transition hover:bg-neutral-100"
                          }
                        >
                          {reportIsPublished
                            ? "Voir le rapport"
                            : "Voir la demande"}
                        </Link>
                      </div>
                    </div>

                    {!reportIsPublished && (
                      <div className="mt-5 border-t border-neutral-100 pt-5">
                        <p className="text-sm text-neutral-500">
                          {audit.status === "PENDING"
                            ? "Votre demande a bien été reçue. L’analyse commencera prochainement."
                            : "Votre rapport est en cours de préparation."}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}