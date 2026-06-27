// app/login/page.tsx
import Image from "next/image";
import Link from "next/link";
import { signIn } from "../../lib/auth";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-[#f8f7f3] text-neutral-950 md:grid-cols-2">
      <section className="relative hidden overflow-hidden md:block">
        <Image
          src="/food/burger1.jpg"
          alt="Restaurant food"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-10 left-10 max-w-md text-white">
          <p className="text-sm uppercase tracking-[0.35em]">LUMI</p>
          <h1 className="mt-4 text-4xl font-semibold">
            Analysez, optimisez, développez votre restaurant.
          </h1>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-sm">
          <Link href="/" className="text-sm text-neutral-500">
            ← Retour à l’accueil
          </Link>

          <h2 className="mt-10 text-4xl font-semibold">Connexion</h2>

          <p className="mt-3 text-neutral-600">
            Accédez à votre espace client LUMI.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-black px-6 py-4 text-sm uppercase tracking-widest text-white"
            >
              Continuer avec Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Votre compte sera créé automatiquement lors de la première connexion.
          </p>
        </div>
      </section>
    </main>
  );
}
