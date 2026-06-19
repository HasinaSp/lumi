// components/audit-page.tsx
import Link from "next/link";
import { AuditForm } from "./audit-form";

type AuditPageProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
};

export function AuditPage({ title, price, description, features }: AuditPageProps) {
  return (
    <main className="min-h-screen bg-[#f8f7f3] px-6 py-24 text-neutral-950 dark:bg-black dark:text-white">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-neutral-500">
          ← Retour à l’accueil
        </Link>

        <h1 className="mt-10 text-5xl font-semibold">{title}</h1>

        <p className="mt-4 text-4xl font-bold">{price}</p>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          {description}
        </p>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm dark:bg-neutral-900">
          <h2 className="text-2xl font-semibold">Ce qui est inclus</h2>

          <ul className="mt-6 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="text-neutral-700 dark:text-neutral-300">
                ✓ {feature}
              </li>
            ))}
          </ul>
        </div>

        <AuditForm offer={title} price={price} />
      </section>
    </main>
  );
}