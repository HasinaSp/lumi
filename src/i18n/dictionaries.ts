// src/i18n/dictionaries.ts

export const dictionaries = {
  fr: {
    common: {
      logout: "Déconnexion",
      backHome: "Retour à l’accueil",
      loading: "Chargement...",
      save: "Enregistrer",
      cancel: "Annuler",
      publish: "Publier",
      language: "Langue",
      view: "Voir",
      download: "Télécharger",
      unavailable: "Indisponible",
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
      eyebrow: "HIKARI LUMI",
      heroTitle: "Boostez la visibilité de votre restaurant.",
      heroDescription:
        "LUMI révèle le potentiel caché des restaurateurs et les aide à améliorer leurs ventes, leur image et leur présence digitale grâce à des audits et recommandations concrètes.",
      requestAudit: "Demander un audit",
      viewServices: "Voir les services",

      servicesEyebrow: "Services",
      servicesTitle:
        "Tout ce dont un restaurant a besoin pour mieux performer en ligne.",

      methodEyebrow: "Méthode",
      methodSteps: [
        {
          title: "Audit",
          description: "Analyse de votre présence actuelle.",
        },
        {
          title: "Plan d’action",
          description: "Priorités claires pour progresser.",
        },
        {
          title: "Optimisation",
          description: "Mise en place des améliorations.",
        },
      ],

      reportEyebrow: "Exemple de rapport",
      reportTitle:
        "Un score clair pour comprendre vos points forts et vos faiblesses.",
      reportDescription:
        "Chaque audit LUMI fournit un score global sur 100 et des recommandations concrètes pour améliorer votre fiche Uber Eats ou Deliveroo.",

      offersEyebrow: "Offres d’audit",
      offersTitle:
        "Un rapport clair pour savoir exactement quoi améliorer.",
      offersDescription:
        "Photos, descriptions, prix, concurrence, visibilité et recommandations sont réunis dans votre espace client.",

      contactTitle:
        "Prêt à révéler le potentiel de votre restaurant ?",
      contactDescription:
        "Contactez LUMI pour un premier échange ou choisissez directement une offre.",
      contactCta: "Contacter LUMI",
    },

    offers: {
      simple: {
        name: "Audit Découverte",
        price: "Gratuit",
        badge: "Offre de lancement",
        cta: "Commencer gratuitement",
        description:
          "Un diagnostic rapide de votre fiche Uber Eats ou Deliveroo avec les points essentiels à corriger.",
      },
      complete: {
        name: "Audit Complet",
        price: "79 €",
        badge: "Le plus recommandé",
        cta: "Choisir l’audit complet",
        description:
          "Une analyse approfondie de votre présence avec recommandations détaillées et plan d’action.",
      },
      monthly: {
        name: "Accompagnement",
        price: "199 €/mois",
        badge: "Croissance continue",
        cta: "Démarrer l’accompagnement",
        description:
          "Un suivi mensuel pour améliorer vos performances et mesurer vos progrès.",
      },
    },

    auth: {
      loginTitle: "Connexion",
      loginDescription: "Accédez à votre espace client LUMI.",
      googleLogin: "Continuer avec Google",
      email: "Adresse email",
      password: "Mot de passe",
      signIn: "Se connecter",
      register: "Créer un compte",
      noAccount: "Vous n’avez pas encore de compte ?",
      alreadyAccount: "Vous avez déjà un compte ?",
    },

    auditForm: {
      title: "Demander un audit LUMI",
      newRequest: "Nouvelle demande",
      selectedOffer: "Offre sélectionnée",
      restaurantName: "Nom du restaurant",
      city: "Ville",
      platform: "Plateforme",
      marketplaceUrl: "Lien Uber Eats / Deliveroo",
      message: "Message ou objectif principal",
      freeSubmit: "Envoyer ma demande gratuite",
      paidSubmit: "Continuer vers le paiement",
      processing: "Traitement...",
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
      noAuditDescription:
        "Choisissez une offre pour lancer votre premier audit.",
      reportPublished: "Rapport disponible",
      requestReceived:
        "Votre demande a bien été reçue. L’analyse commencera prochainement.",
      reportInProgress: "Votre rapport est en cours de préparation.",
    },

    report: {
      title: "Rapport LUMI",
      globalScore: "Score global",
      photos: "Photos",
      menu: "Menu",
      pricing: "Prix",
      visibility: "Visibilité",
      summary: "Résumé",
      strengths: "Points forts",
      improvements: "Axes d’amélioration",
      recommendations: "Recommandations",
      notAvailable: "Votre rapport n’est pas encore disponible.",
      inPreparation: "Votre audit est en cours de préparation.",
      downloadHtml: "Télécharger en HTML",
      printPdf: "Imprimer / enregistrer en PDF",
      optimizedMenu: "Voir le menu optimisé",
    },

    legal: {
      terms: "Conditions d’utilisation",
      privacy: "Politique de confidentialité",
      lastUpdated: "Dernière mise à jour",
    },

    errors: {
      forbiddenTitle: "Accès refusé",
      forbiddenDescription:
        "Vous n’avez pas les permissions nécessaires pour accéder à cette page.",
      notFoundTitle: "Page introuvable",
      notFoundDescription:
        "La page demandée n’existe pas ou a été déplacée.",
      serverTitle: "Une erreur est survenue",
      serverDescription:
        "Un problème technique est survenu. Veuillez réessayer.",
    },
  },

  en: {
    common: {
      logout: "Sign out",
      backHome: "Back to home",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      publish: "Publish",
      language: "Language",
      view: "View",
      download: "Download",
      unavailable: "Unavailable",
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
      eyebrow: "HIKARI LUMI",
      heroTitle: "Boost your restaurant’s online visibility.",
      heroDescription:
        "LUMI helps restaurants improve sales, brand image and digital presence through actionable marketplace audits and recommendations.",
      requestAudit: "Request an audit",
      viewServices: "View services",

      servicesEyebrow: "Services",
      servicesTitle:
        "Everything a restaurant needs to perform better online.",

      methodEyebrow: "How it works",
      methodSteps: [
        {
          title: "Audit",
          description: "Analysis of your current online presence.",
        },
        {
          title: "Action plan",
          description: "Clear priorities for improvement.",
        },
        {
          title: "Optimization",
          description: "Implementation of recommended improvements.",
        },
      ],

      reportEyebrow: "Sample report",
      reportTitle:
        "A clear score to understand your strengths and weaknesses.",
      reportDescription:
        "Each LUMI audit includes an overall score out of 100 and actionable recommendations for your Uber Eats or Deliveroo listing.",

      offersEyebrow: "Audit plans",
      offersTitle:
        "A clear report showing exactly what to improve.",
      offersDescription:
        "Photos, descriptions, pricing, competitors, visibility and recommendations are available from your client dashboard.",

      contactTitle:
        "Ready to unlock your restaurant’s potential?",
      contactDescription:
        "Contact LUMI for an introduction or choose a plan directly.",
      contactCta: "Contact LUMI",
    },

    offers: {
      simple: {
        name: "Discovery Audit",
        price: "Free",
        badge: "Launch offer",
        cta: "Start for free",
        description:
          "A quick review of your Uber Eats or Deliveroo listing with the most important improvements.",
      },
      complete: {
        name: "Complete Audit",
        price: "€79",
        badge: "Most recommended",
        cta: "Choose complete audit",
        description:
          "An in-depth marketplace analysis with detailed recommendations and an action plan.",
      },
      monthly: {
        name: "Monthly Support",
        price: "€199/month",
        badge: "Continuous growth",
        cta: "Start monthly support",
        description:
          "Monthly monitoring to improve performance and track progress over time.",
      },
    },

    auth: {
      loginTitle: "Sign in",
      loginDescription: "Access your LUMI client dashboard.",
      googleLogin: "Continue with Google",
      email: "Email address",
      password: "Password",
      signIn: "Sign in",
      register: "Create an account",
      noAccount: "Don’t have an account yet?",
      alreadyAccount: "Already have an account?",
    },

    auditForm: {
      title: "Request a LUMI audit",
      newRequest: "New request",
      selectedOffer: "Selected plan",
      restaurantName: "Restaurant name",
      city: "City",
      platform: "Platform",
      marketplaceUrl: "Uber Eats / Deliveroo link",
      message: "Message or primary objective",
      freeSubmit: "Submit my free request",
      paidSubmit: "Continue to payment",
      processing: "Processing...",
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
      noAuditDescription:
        "Choose a plan to start your first audit.",
      reportPublished: "Report available",
      requestReceived:
        "Your request has been received. The analysis will begin shortly.",
      reportInProgress: "Your report is being prepared.",
    },

    report: {
      title: "LUMI Report",
      globalScore: "Overall score",
      photos: "Photos",
      menu: "Menu",
      pricing: "Pricing",
      visibility: "Visibility",
      summary: "Summary",
      strengths: "Strengths",
      improvements: "Areas for improvement",
      recommendations: "Recommendations",
      notAvailable: "Your report is not available yet.",
      inPreparation: "Your audit is currently being prepared.",
      downloadHtml: "Download as HTML",
      printPdf: "Print / save as PDF",
      optimizedMenu: "View optimized menu",
    },

    legal: {
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      lastUpdated: "Last updated",
    },

    errors: {
      forbiddenTitle: "Access denied",
      forbiddenDescription:
        "You do not have permission to access this page.",
      notFoundTitle: "Page not found",
      notFoundDescription:
        "The requested page does not exist or has been moved.",
      serverTitle: "Something went wrong",
      serverDescription:
        "A technical issue occurred. Please try again.",
    },
  },
} as const;

export type Locale = keyof typeof dictionaries;