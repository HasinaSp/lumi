// app/audit/simple/page.tsx

import { AuditPage } from "src/components/audit-page";

export default function AuditSimplePage() {
  return (
    <AuditPage
      title="Audit Simple"
      price="Gratuite"
      description="Un diagnostic rapide de votre fiche UberEats ou Deliveroo avec les points prioritaires à corriger."
      features={[
        "Score global /100",
        "Analyse des photos",
        "Analyse des descriptions",
        "Vérification des prix",
        "Note client & visibilité",
        "3 recommandations prioritaires",
        "Rapport PDF synthétique",
      ]}
    />
  );
}