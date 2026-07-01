// src/app/error.tsx
"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f7f3] px-6 text-neutral-950">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          Erreur 500
        </p>
        <h1 className="mt-4 text-5xl font-semibold">Une erreur est survenue</h1>
        <p className="mt-6 text-neutral-600">
          Un problème technique est arrivé. Vous pouvez réessayer ou revenir à
          l’accueil.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-full bg-black px-6 py-4 text-sm uppercase tracking-widest text-white"
          >
            Réessayer
          </button>

          <Link
            href="/"
            className="rounded-full border border-neutral-300 px-6 py-4 text-sm uppercase tracking-widest"
          >
            Accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
