import Link from "next/link";

export const metadata = {
  title: "Conditions d’utilisation | LUMI",
  description: "Conditions d’utilisation de la plateforme LUMI.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f3] px-6 py-16 text-neutral-950">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-neutral-500">
          ← Retour à l’accueil
        </Link>

        <p className="mt-10 text-sm uppercase tracking-[0.35em] text-neutral-500">
          LUMI
        </p>

        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
          Conditions d’utilisation
        </h1>

        <p className="mt-4 text-sm text-neutral-500">
          Dernière mise à jour : 15 juillet 2026
        </p>

        <div className="mt-12 space-y-10 leading-7 text-neutral-700">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              1. Objet
            </h2>

            <p className="mt-4">
              LUMI propose des services d’analyse et d’optimisation de profils
              de restaurants présents sur des plateformes de livraison telles
              qu’Uber Eats et Deliveroo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              2. Création d’un compte
            </h2>

            <p className="mt-4">
              L’utilisateur doit fournir des informations exactes et maintenir
              la confidentialité de ses identifiants. Toute utilisation du
              compte est réputée effectuée par son titulaire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              3. Services proposés
            </h2>

            <p className="mt-4">
              Les rapports LUMI fournissent des analyses et recommandations
              destinées à aider les restaurateurs dans leur prise de décision.
              Ils ne constituent pas une garantie d’augmentation des ventes,
              du chiffre d’affaires ou du positionnement sur une plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              4. Paiements
            </h2>

            <p className="mt-4">
              Les paiements des offres payantes sont traités par Lemon Squeezy,
              qui agit comme intermédiaire de paiement et Merchant of Record.
              Les conditions relatives à la transaction peuvent également être
              soumises aux conditions acheteur de Lemon Squeezy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              5. Offre gratuite
            </h2>

            <p className="mt-4">
              L’offre Audit Découverte peut être limitée à une demande par
              compte, par restaurant ou par période de lancement. LUMI se
              réserve le droit de suspendre ou modifier cette offre.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              6. Propriété intellectuelle
            </h2>

            <p className="mt-4">
              Les rapports, contenus, éléments graphiques, méthodes et analyses
              fournis par LUMI restent protégés par les règles applicables en
              matière de propriété intellectuelle. Le client peut utiliser son
              rapport pour les besoins internes de son activité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              7. Responsabilité
            </h2>

            <p className="mt-4">
              LUMI s’efforce de fournir des analyses fiables, mais ne garantit
              pas l’exactitude permanente des informations provenant de
              services tiers. Les décisions commerciales restent sous la
              responsabilité du client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              8. Suspension et suppression
            </h2>

            <p className="mt-4">
              LUMI peut suspendre un compte en cas de fraude, d’abus, de
              violation des présentes conditions ou d’utilisation susceptible
              de nuire à la plateforme ou à ses utilisateurs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              9. Contact
            </h2>

            <p className="mt-4">
              Pour toute question concernant ces conditions :
              speyerhasina@gmail.com
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}