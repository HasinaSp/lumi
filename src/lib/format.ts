export function formatAuditStatus(status: string) {
  const labels: Record<string, string> = {
    PENDING: "En attente",
    IN_PROGRESS: "En cours",
    COMPLETED: "Rapport disponible",
  };

  return labels[status] ?? status;
}

export function auditStatusClass(status: string) {
  const classes: Record<string, string> = {
    PENDING: "bg-orange-100 text-orange-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  return classes[status] ?? "bg-neutral-100 text-neutral-700";
}