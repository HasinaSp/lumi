import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";
import LanguageSwitcher from "./LanguageSwitcher";

type NavbarLabels = {
  home: string;
  services: string;
  offers: string;
  method: string;
  contact: string;
  login: string;
  dashboard: string;
  requestAudit: string;
};

type NavbarProps = {
  locale: "fr" | "en";
  labels: NavbarLabels;
};

export function Navbar({
  locale,
  labels,
}: NavbarProps) {
  const navLinks = [
    {
      label: labels.services,
      href: "/#services",
    },
    {
      label: labels.offers,
      href: "/#offres",
    },
    {
      label: labels.method,
      href: "/#process",
    },
    {
      label: labels.contact,
      href: "/#contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f7f3]/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label={labels.home}
          className="flex shrink-0 items-center"
        >
          <Image
            src="/lumi-logo/lumi-logo-light-vector.svg"
            alt="LUMI"
            width={80}
            height={80}
            priority
            className="block rounded-full dark:hidden"
          />

          <Image
            src="/lumi-logo/lumi-logo-dark-vector.svg"
            alt="LUMI"
            width={80}
            height={80}
            priority
            className="hidden rounded-full dark:block"
          />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-7 text-sm md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral-700 transition hover:text-black dark:text-neutral-300 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher currentLocale={locale} />

          {/* <ThemeToggle /> */}

          <Link
            href="/login"
            className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            {labels.login}
          </Link>

          <Link
            href="/#offres"
            className="hidden rounded-full bg-black px-5 py-3 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 lg:inline-block"
          >
            {labels.requestAudit}
          </Link>
        </div>
      </div>
    </header>
  );
}