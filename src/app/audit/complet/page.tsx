// app/audit/complet/page.tsx
import { AuditPage } from "src/components/audit-page";

export default function AuditCompletPage() {
  return (
    <AuditPage
      title="Audit Complet"
      price="79€"
      description="Une analyse détaillée de votre présence sur UberEats ou Deliveroo avec comparaison concurrentielle."
      features={[
        "Score global détaillé /100",
        "Qualité des photos",
        "Descriptions & menu engineering",
        "Prix vs concurrence locale",
        "Temps de préparation",
        "Analyse des notes clients",
        "Visibilité & positionnement",
        "Plan d’action complet",
        "Rapport PDF professionnel",
      ]}
    />
  );
}