import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

type NewAuditPageProps = {
  searchParams: Promise<{
    offer?: string;
  }>;
};

function getSelectedOffer(offer?: string) {
  if (offer === "COMPLETE" || offer === "MONTHLY" || offer === "SIMPLE") {
    return offer;
  }

  return "SIMPLE";
}

function getOfferLabel(offer: string) {
  if (offer === "COMPLETE") return "Audit Complet — 79€";
  if (offer === "MONTHLY") return "Accompagnement mensuel — 199€/mois";
  return "Audit Simple";
}

async function startCheckout(formData: FormData) {
  "use server";

  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
  });

  if (!user) {
    redirect("/login");
  }

  const restaurantName = String(formData.get("restaurantName") ?? "");
  const city = String(formData.get("city") ?? "");
  const platform = String(formData.get("platform") ?? "UBEREATS");
  const offer = String(formData.get("offer") ?? "SIMPLE");
  const marketplaceUrl = String(formData.get("marketplaceUrl") ?? "");
  const message = String(formData.get("message") ?? "");

  console.log({
    restaurantName,
    city,
    platform,
    offer,
    marketplaceUrl,
    message,
  });

  redirect("/dashboard");
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

        <form
          action={startCheckout}
          className="mt-10 space-y-4 rounded-3xl bg-white p-8 shadow-sm"
        >
          <input type="hidden" name="offer" value={selectedOffer} />

          <div className="rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-700">
            Offre sélectionnée :{" "}
            <strong>{getOfferLabel(selectedOffer)}</strong>
          </div>

          <input
            name="restaurantName"
            required
            placeholder="Nom du restaurant"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none"
          />

          <input
            name="city"
            placeholder="Ville"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none"
          />

          <select
            name="platform"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 outline-none"
          >
            <option value="UBEREATS">Uber Eats</option>
            <option value="DELIVEROO">Deliveroo</option>
            <option value="BOTH">Uber Eats + Deliveroo</option>
          </select>

          <input
            name="marketplaceUrl"
            placeholder="Lien Uber Eats / Deliveroo"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none"
          />

          <textarea
            name="message"
            rows={5}
            placeholder="Message ou objectif principal"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none"
          />

          <button className="w-full rounded-full bg-black px-6 py-4 text-sm uppercase tracking-widest text-white">
            Envoyer ma demande
          </button>
        </form>
      </section>
    </main>
  );
}
