export const dictionaries = {
  fr: {
    common: {
      logout: "Déconnexion",
      backHome: "Retour à l’accueil",
      loading: "Chargement...",
      language: "Langue",
    },

    navbar: {
      home: "Accueil",
      services: "Services",
      offers: "Offres",
      method: "Méthode",
      contact: "Contact",
      login: "Connexion",
      dashboard: "Dashboard",
      requestAudit: "Demander un audit",
    },

    landing: {
      heroTitle: "Boostez la visibilité de votre restaurant.",
      heroDescription:
        "LUMI revèle le potentiel caché des restaurateurs et les aide à améliorer leurs ventes, leur image et leur présence digitale grâce à des audits, optimisations et outils simples à mettre en place, pour rayonner.",
      requestAudit: "Demander un audit",
      viewServices: "Voir les services",
      offersTitle: "Un rapport clair pour savoir exactement quoi améliorer.",
    },

    dashboard: {
      area: "Espace client LUMI",
      hello: "Bonjour",
      newAudit: "Demander un nouvel audit",
      totalAudits: "Total des audits",
      preparing: "En préparation",
      reportsAvailable: "Rapports disponibles",
      myAudits: "Mes demandes d’audit",
      paymentConfirmed: "Paiement confirmé",
      paymentCheck: "Paiement à vérifier",
      viewReport: "Voir le rapport",
      viewRequest: "Voir la demande",
      noAudit: "Aucun audit pour le moment",
    },
  },

  en: {
    common: {
      logout: "Sign out",
      backHome: "Back to home",
      loading: "Loading...",
      language: "Language",
    },

    navbar: {
      home: "Home",
      services: "Services",
      offers: "Plans",
      method: "How it works",
      contact: "Contact",
      login: "Sign in",
      dashboard: "Dashboard",
      requestAudit: "Request an audit",
    },

    landing: {
      heroTitle: "Boost your restaurant’s online visibility.",
      heroDescription:
        "LUMI helps restaurants improve their sales, brand image and digital presence through actionable marketplace audits.",
      requestAudit: "Request an audit",
      viewServices: "View services",
      offersTitle: "A clear report showing exactly what to improve.",
    },

    dashboard: {
      area: "LUMI client area",
      hello: "Hello",
      newAudit: "Request a new audit",
      totalAudits: "Total audits",
      preparing: "In progress",
      reportsAvailable: "Reports available",
      myAudits: "My audit requests",
      paymentConfirmed: "Payment confirmed",
      paymentCheck: "Payment pending verification",
      viewReport: "View report",
      viewRequest: "View request",
      noAudit: "No audits yet",
    },
  },
} as const;

export type Locale = keyof typeof dictionaries;