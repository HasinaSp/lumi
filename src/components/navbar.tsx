// components/navbar.tsx
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Offres", href: "#offres" },
  { label: "Méthode", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f7f3]/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/lumi-logo/lumi-logo-light-vector.svg"
            alt="Logo LUMI"
            width={90}
            height={90}
            priority
            className="block dark:hidden"
          />

          <Image
            src="/lumi-logo/lumi-logo-dark-vector.svg"
            alt="Logo LUMI"
            width={90}
            height={90}
            priority
            className="hidden dark:block"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
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

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="#offres"
            className="hidden rounded-full bg-black px-5 py-3 text-xs uppercase tracking-widest text-white transition hover:opacity-90 dark:bg-white dark:text-black sm:inline-block"
          >
            Demander un audit
          </Link>
        </div>
      </div>
    </header>
  );
}
