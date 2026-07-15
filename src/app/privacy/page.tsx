import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité | LUMI",
  description: "Politique de confidentialité de la plateforme LUMI.",
};

export default function PrivacyPage() {
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
          Politique de confidentialité
        </h1>

        <p className="mt-4 text-sm text-neutral-500">
          Dernière mise à jour : 15 juillet 2026
        </p>

        <div className="mt-12 space-y-10 leading-7 text-neutral-700">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              1. Responsable du traitement
            </h2>

            <p className="mt-4">
              Le responsable du traitement des données collectées par LUMI est
              l’éditeur de la plateforme LUMI.
            </p>

            <p className="mt-2">
              Contact : speyerhasina@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              2. Données collectées
            </h2>

            <p className="mt-4">
              LUMI peut collecter les données suivantes :
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>nom et adresse email ;</li>
              <li>photo de profil Google lorsque disponible ;</li>
              <li>informations relatives au restaurant ;</li>
              <li>liens Uber Eats ou Deliveroo ;</li>
              <li>messages et demandes transmis dans les formulaires ;</li>
              <li>historique des audits et rapports ;</li>
              <li>informations techniques nécessaires à la sécurité.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              3. Finalités
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>créer et gérer les comptes utilisateurs ;</li>
              <li>traiter les commandes et demandes d’audit ;</li>
              <li>produire et publier les rapports ;</li>
              <li>envoyer les notifications liées au service ;</li>
              <li>sécuriser la plateforme et prévenir les abus ;</li>
              <li>assurer le support utilisateur.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              4. Base légale
            </h2>

            <p className="mt-4">
              Les traitements peuvent être fondés sur l’exécution du contrat,
              le consentement de l’utilisateur, le respect d’obligations
              légales ou l’intérêt légitime de LUMI à sécuriser et améliorer
              son service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              5. Prestataires
            </h2>

            <p className="mt-4">
              Les données peuvent être traitées par les prestataires techniques
              nécessaires au fonctionnement de LUMI, notamment :
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Vercel pour l’hébergement ;</li>
              <li>Neon pour la base de données PostgreSQL ;</li>
              <li>Google pour l’authentification ;</li>
              <li>Lemon Squeezy pour les paiements ;</li>
              <li>Resend pour l’envoi des emails.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              6. Durée de conservation
            </h2>

            <p className="mt-4">
              Les données sont conservées pendant la durée nécessaire à la
              fourniture du service, au respect des obligations légales et à
              la défense des droits de LUMI. Un compte supprimé peut entraîner
              la suppression ou l’anonymisation de certaines données, sous
              réserve des obligations de conservation applicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              7. Droits des utilisateurs
            </h2>

            <p className="mt-4">
              Selon la réglementation applicable, vous pouvez demander l’accès,
              la rectification, l’effacement, la limitation ou la portabilité
              de vos données, ainsi que vous opposer à certains traitements.
            </p>

            <p className="mt-2">
              Pour exercer vos droits : contact@expertplace.fr
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              8. Cookies
            </h2>

            <p className="mt-4">
              LUMI utilise des cookies strictement nécessaires à
              l’authentification, à la sécurité et au fonctionnement de la
              plateforme. Si des outils de mesure d’audience ou de publicité
              sont ajoutés ultérieurement, une information et, lorsque requis,
              un mécanisme de consentement seront mis en place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              9. Sécurité
            </h2>

            <p className="mt-4">
              LUMI met en œuvre des mesures techniques et organisationnelles
              raisonnables afin de protéger les données contre les accès non
              autorisés, les pertes ou les altérations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-950">
              10. Réclamation
            </h2>

            <p className="mt-4">
              Lorsque le RGPD est applicable, vous pouvez également introduire
              une réclamation auprès de l’autorité de protection des données
              compétente.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}