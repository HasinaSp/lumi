// app/audit/accompagnement/page.tsx
import { AuditPage } from "src/components/audit-page";

export default function AuditAccompagnementPage() {
  return (
    <AuditPage
      title="Accompagnement mensuel"
      price="199€/mois"
      description="Un suivi mensuel pour améliorer vos performances, tester des optimisations et suivre vos résultats."
      features={[
        "Audit mensuel UberEats / Deliveroo",
        "Suivi du Score LUMI™",
        "Optimisation continue du menu",
        "Recommandations prix & offres",
        "Conseils photos & descriptions",
        "Suivi concurrence",
        "Compte-rendu PDF mensuel",
        "Support prioritaire",
      ]}
    />
  );
}