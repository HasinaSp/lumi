// src/app/audit/new/page.tsx

import { auth } from "src/lib/auth";
import { redirect } from "next/navigation";
import AuditCheckoutForm from "./AuditCheckoutForm";

type NewAuditPageProps = {
  searchParams: Promise<{
    offer?: string;
  }>;
};

function getSelectedOffer(offer?: string): "SIMPLE" | "COMPLETE" | "MONTHLY" {
  if (
    offer === "SIMPLE" ||
    offer === "COMPLETE" ||
    offer === "MONTHLY"
  ) {
    return offer;
  }

  return "SIMPLE";
}

function getOfferLabel(offer: "SIMPLE" | "COMPLETE" | "MONTHLY") {
  switch (offer) {
    case "COMPLETE":
      return "Audit Complet — 79 €";

    case "MONTHLY":
      return "Accompagnement Mensuel — 199 €/mois";

    default:
      return "Audit Simple — 12 €";
  }
}

export default async function NewAuditPage({
  searchParams,
}: NewAuditPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { offer } = await searchParams;

  const selectedOffer = getSelectedOffer(offer);

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-6 py-10 text-neutral-950">
      <section className="mx-auto max-w-3xl">

        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          Nouvelle demande
        </p>

        <h1 className="mt-3 text-4xl font-semibold">
          Demander un audit LUMI
        </h1>

        <AuditCheckoutForm
          selectedOffer={selectedOffer}
          selectedOfferLabel={getOfferLabel(selectedOffer)}
        />

      </section>
    </main>
  );
}
