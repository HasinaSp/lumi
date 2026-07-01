// src/app/dashboard/audits/[id]/page.tsx
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientAuditPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.email) redirect("/login");

  const { id } = await params;

  const audit = await prisma.auditRequest.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!audit) notFound();

  if (audit.user.email !== session.user.email) {
    redirect("/forbidden");
  }

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-6 py-10 text-neutral-950">
      <section className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-sm text-neutral-500">
          ← Retour au dashboard
        </Link>

        <h1 className="mt-6 text-4xl font-semibold">
          {audit.restaurantName}
        </h1>

        {!audit.htmlReport ? (
          <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-neutral-600">
              Votre rapport n’est pas encore disponible.
            </p>
          </div>
        ) : (
          <div
            className="mt-10"
            dangerouslySetInnerHTML={{ __html: audit.htmlReport }}
          />
        )}
      </section>
    </main>
  );
}
