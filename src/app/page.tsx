import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../components/navbar";
import LanguageSwitcher from "src/components/LanguageSwitcher";
import { getDictionary } from "src/lib/locale";

const services = [
  "Audit UberEats",
  "Optimisation de menu",
  "Analyse des prix",
  "Optimisation de visibilité",
  "Optimisation des photos des plats",
  "QR menu",
];

const texts = {
  "auditubereats": "Un audit complet de votre présence sur UberEats ou Deliveroo, avec un rapport clair et des recommandations concrètes.",
  "optimisationdemenu": "Une optimisation de votre menu pour améliorer la conversion, la lisibilité et l’attractivité de vos plats.",
  "analysedesprix": "Une analyse des prix de vos plats par rapport à la concurrence locale, avec des recommandations pour maximiser vos ventes.",
  "optimisationdevisibilité": "Une optimisation de votre visibilité sur UberEats ou Deliveroo, avec des conseils pour améliorer votre positionnement et votre référencement.",
  "optimisationdesphotosdesplats": "Une optimisation de vos photos de plats pour améliorer l’attrait visuel et la conversion.",
  "qrmenu": "Un QR menu interactif pour faciliter la commande et améliorer l’expérience client.",
};

const foodImages = [
  {
    title: "Pizza Pepperoni",
    image: "/food/pizza2.jpg",
  },
  {
    title: "Chicken burger",
    image: "/food/burger2.jpg",
  },
  {
    title: "Mozzarella sticks",
    image: "/food/mozza-sticks1.jpg",
  },
  {
    title: "Tacos",
    image: "/food/tacos1.png",
  },
];
const plans = [
  {
    name: "Audit Découverte",
    price: "Gratuit",
    href: "/audit/new?offer=SIMPLE",
    badge: "Offre de lancement",
    cta: "Commencer gratuitement",
    highlighted: false,
    description:
      "Découvrez les principaux points à améliorer sur votre fiche Uber Eats ou Deliveroo, sans engagement.",
    features: [
      "Score global /100",
      "Analyse rapide des photos",
      "Analyse des descriptions",
      "Vérification des prix",
      "Analyse de la visibilité",
      "3 recommandations prioritaires",
      "Rapport consultable en ligne",
    ],
  },
  {
    name: "Audit Complet",
    price: "80 €",
    href: "/audit/new?offer=COMPLETE",
    badge: "Le plus recommandé",
    cta: "Choisir l’audit complet",
    highlighted: true,
    description:
      "Une analyse approfondie de votre présence sur Uber Eats ou Deliveroo avec des recommandations détaillées.",
    features: [
      "Score global détaillé /100",
      "Analyse complète et optimisation des photos",
      "Descriptions et organisation du menu",
      "Prix face à la concurrence locale",
      "Analyse des notes clients",
      "Visibilité et positionnement",
      "Plan d’action priorisé",
      "Rapport professionnel en ligne",
    ],
  },
  {
    name: "Accompagnement",
    price: "200 €/mois",
    href: "/audit/new?offer=MONTHLY",
    badge: "Croissance continue",
    cta: "Démarrer l’accompagnement",
    highlighted: false,
    description:
      "Un suivi mensuel pour améliorer vos performances et suivre les résultats des optimisations.",
    features: [
      "Audit mensuel Uber Eats / Deliveroo",
      "Suivi du score LUMI",
      "Optimisation continue du menu",
      "Recommandations sur les prix et offres",
      "Conseils photos et descriptions",
      "Suivi de la concurrence",
      "Rapport mensuel en ligne",
      "Support prioritaire",
    ],
  },
]; 

export const dynamic = "force-dynamic";
export default async function Home() {
  const { locale, dictionary:t } = await getDictionary();
  return (
    <main className="min-h-screen bg-[#f8f7f3] text-neutral-950 transition-colors dark:bg-black dark:text-white">
      <Navbar
        locale={locale}
        labels={t.navbar}
      />
      <section className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
            HIKARI LUMI
          </p>

          <h1 className="text-5xl font-semibold leading-tight md:text-7xl">
            {t.landing.heroTitle}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            {t.landing.heroDescription}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#offres"
              className="rounded-full bg-gray-500 px-8 py-4 text-center text-sm uppercase tracking-widest text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              {t.landing.requestAudit}
            </Link>

            <a
              href="#services"
              className="rounded-full border border-neutral-300 px-8 py-4 text-center text-sm uppercase tracking-widest transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              {t.landing.viewServices}
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm dark:bg-neutral-900">
          <Image
            src="/food/burger1.jpg"
            alt="Burger premium analysé par LUMI"
            width={700}
            height={700}
            className="h-[520px] w-full rounded-[1.5rem] object-cover"
            priority
          />

          <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur dark:bg-black/80">
            <p className="text-sm uppercase tracking-widest text-neutral-500">
              Score photo
            </p>
            <p className="mt-2 text-4xl text-orange-500 font-bold">92/100</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              Photo attractive et professionnelle
            </p>
          </div>
        </div>

      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
          Services
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">
          Tout ce dont un restaurant a besoin pour mieux performer en ligne.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 dark:bg-neutral-900"
            >
              <h3 className="text-xl font-medium">{service}</h3>

              <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                {texts[service.toLowerCase().replace(/\s+/g, "") as keyof typeof texts]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="process"
        className="bg-black px-6 py-24 text-white dark:bg-neutral-950"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
            Méthode
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              ["1", "Audit", "Analyse de votre présence actuelle."],
              ["2", "Plan d’action", "Priorités claires pour progresser."],
              ["3", "Optimisation", "Mise en place des améliorations."],
            ].map(([number, title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/50 p-8"
              >
                <span className="text-neutral-500 bg-emerald-500 rounded-full px-3 py-1">{number}</span>

                <h3 className="mt-6 text-2xl font-medium">{title}</h3>

                <p className="mt-4 text-neutral-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
          Photos & appétence
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">
          Sur UberEats et Deliveroo, vos photos vendent avant vos descriptions.
        </h2>

        <p className="mt-6 max-w-2xl text-neutral-600 dark:text-neutral-400">
          LUMI analyse la qualité visuelle de vos plats : lumière, netteté, cadrage,
          appétence, cohérence et potentiel de conversion.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {foodImages.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-3xl bg-white p-3 shadow-sm dark:bg-neutral-900"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className="h-72 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="p-4">
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Analyse de l’impact visuel et des points d’amélioration.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 rounded-[2rem] bg-white p-8 shadow-sm dark:bg-neutral-900 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
              Exemple de rapport
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Un score clair pour comprendre vos points forts et vos faiblesses.
            </h2>

            <p className="mt-6 text-neutral-600 dark:text-neutral-400">
              Chaque audit LUMI vous donne un score global sur 100, accompagné de
              recommandations concrètes pour améliorer votre fiche UberEats ou
              Deliveroo.
            </p>
          </div>
            <div className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-700">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm uppercase tracking-widest text-neutral-500">
                    Score LUMI™
                  </p>
                  <p className="mt-2 text-6xl font-bold">84</p>
                </div>
                <p className="text-2xl font-semibold text-neutral-500">/100</p>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  ["Photos", "22/25"],
                  ["Menu", "18/20"],
                  ["Prix", "13/15"],
                  ["Visibilité", "12/15"],
                  ["Avis clients", "9/15"],
                  ["Concurrence", "10/10"],
                ].map(([label, score]) => (
                  <div key={label} className="flex justify-between border-b border-neutral-200 pb-3 dark:border-neutral-700">
                    <span>{label}</span>
                    <span className="font-medium">{score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </section>
      <section id="offres" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
          Offres d’audit
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">
          Un rapport clair pour savoir exactement quoi améliorer.
        </h2>

        <p className="mt-6 max-w-2xl text-neutral-600 dark:text-neutral-400">
          Chaque audit LUMI analyse votre présence sur UberEats ou Deliveroo :
          photos, descriptions, prix, concurrence, visibilité, avis clients et
          recommandations concrètes.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-[2rem] p-8 shadow-sm ${
                plan.highlighted
                  ? "bg-neutral-950 text-white ring-2 ring-neutral-950 dark:bg-white dark:text-black dark:ring-white"
                  : "bg-white dark:bg-neutral-900"
              }`}
            >
              <span
                className={`w-fit rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest ${
                  plan.highlighted
                    ? "bg-white/10 text-white dark:bg-black/10 dark:text-black"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {plan.badge}
              </span>

              <h3 className="mt-8 text-2xl font-semibold">{plan.name}</h3>

              <p className="mt-4 text-4xl font-bold">{plan.price}</p>

              <p
                className={`mt-4 leading-7 ${
                  plan.highlighted
                    ? "text-neutral-300 dark:text-neutral-600"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                {plan.description}
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={
                      plan.highlighted
                        ? "text-neutral-200 dark:text-neutral-700"
                        : "text-neutral-700 dark:text-neutral-300"
                    }
                  >
                    <span className="mr-2 text-emerald-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 block rounded-full px-6 py-4 text-center text-sm font-medium uppercase tracking-widest transition ${
                  plan.highlighted
                    ? "bg-white text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800"
                    : "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-4xl px-6 py-24 text-center"
      >
        <h2 className="text-4xl font-semibold md:text-5xl">
          Prêt à révéler le potentiel de votre restaurant ?
        </h2>

        <p className="mt-6 text-neutral-600 dark:text-neutral-400">
          Contactez LUMI pour un premier échange ou un audit de votre présence
          digitale.
        </p>

        <a
          href="mailto:speyerhasina@gmail.com"
          className="mt-10 inline-block rounded-full bg-black px-8 py-4 text-sm uppercase tracking-widest text-white transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          Contacter LUMI
        </a>
      </section>
      <div className="mb-6 flex flex-wrap justify-center gap-5 text-sm text-neutral-500">
          <Link href="/terms">Conditions d’utilisation</Link>
          <Link href="/privacy">Confidentialité</Link>
      </div>
    </main>
  );
}