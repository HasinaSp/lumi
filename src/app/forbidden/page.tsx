import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f7f3] px-6 text-neutral-950">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          Erreur 403
        </p>
        <h1 className="mt-4 text-5xl font-semibold">Accès refusé</h1>
        <p className="mt-6 text-neutral-600">
          Vous n’avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-full bg-black px-6 py-4 text-sm uppercase tracking-widest text-white"
        >
          Retour au dashboard
        </Link>
      </div>
    </main>
  );
}
