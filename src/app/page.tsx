import Image from "next/image";
import { ThemeToggle } from "../components/theme-toggle";

const services = [
  "Audit UberEats",
  "Optimisation de menu",
  "Analyse des prix",
  "Analyse des concurrents",
  "Optimisation de visibilité",
  "Campagnes emailing",
  "Site web restaurant",
  "Community management",
  "QR menu",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f7f3] text-neutral-950 transition-colors dark:bg-black dark:text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="relative h-[110px] w-[110px]">
          <Image
            src="/lumi-logo/lumi-logo-light-vector.svg"
            alt="Logo LUMI"
            width={110}
            height={110}
            priority
            className="block dark:hidden"
          />

          <Image
            src="/lumi-logo/lumi-logo-dark-vector.svg"
            alt="Logo LUMI"
            width={110}
            height={110}
            priority
            className="hidden dark:block"
          />
        </div>

        <nav className="hidden gap-8 text-sm md:flex">
          <a
            href="#services"
            className="text-neutral-700 transition hover:text-black dark:text-neutral-300 dark:hover:text-white"
          >
            Services
          </a>

          <a
            href="#process"
            className="text-neutral-700 transition hover:text-black dark:text-neutral-300 dark:hover:text-white"
          >
            Méthode
          </a>

          <a
            href="#contact"
            className="text-neutral-700 transition hover:text-black dark:text-neutral-300 dark:hover:text-white"
          >
            Contact
          </a>
        </nav>

        <ThemeToggle />
      </header>

      <section className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
            Saas pour restaurateurs
          </p>

          <h1 className="text-5xl font-semibold leading-tight md:text-7xl">
            Boostez la visibilité de votre restaurant.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            LUMI aide les restaurateurs à améliorer leurs ventes, leur image et
            leur présence digitale grâce à des audits, optimisations et outils
            simples à mettre en place.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-black px-8 py-4 text-center text-sm uppercase tracking-widest text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              Demander un audit
            </a>

            <a
              href="#services"
              className="rounded-full border border-neutral-300 px-8 py-4 text-center text-sm uppercase tracking-widest transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              Voir les services
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm dark:bg-neutral-900">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
            Diagnostic digital
          </p>

          <div className="mt-8 space-y-5">
            {[
              "Votre menu est-il optimisé ?",
              "Vos photos donnent-elles envie ?",
              "Vos prix sont-ils cohérents ?",
              "Êtes-vous visible face aux concurrents ?",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-700"
              >
                {item}
              </div>
            ))}
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
                Une solution claire, actionnable et adaptée aux restaurateurs.
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
              ["01", "Audit", "Analyse de votre présence actuelle."],
              ["02", "Plan d’action", "Priorités claires pour progresser."],
              ["03", "Optimisation", "Mise en place des améliorations."],
            ].map(([number, title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 p-8"
              >
                <span className="text-neutral-500">{number}</span>

                <h3 className="mt-6 text-2xl font-medium">{title}</h3>

                <p className="mt-4 text-neutral-400">{text}</p>
              </div>
            ))}
          </div>
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
          href="mailto:contact@expertplace.fr"
          className="mt-10 inline-block rounded-full bg-black px-8 py-4 text-sm uppercase tracking-widest text-white transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          Contacter LUMI
        </a>
      </section>
    </main>
  );
}