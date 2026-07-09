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
        <div className="absolute bottom-40 left-10 max-w-md text-white">
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
          await signIn("google", { redirectTo: "/redirect" });
        }}
      >
        <button
          type="submit"
          className="mt-8 w-full rounded-full px-6 py-4 text-sm uppercase tracking-widest text-neutral-500"
        >
          <img src="/google-logo/google.png" alt="logo" className="inline-block h-5 w-5 mr-2" />
          Continuer avec Google
        </button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs uppercase tracking-widest text-neutral-400">
          ou
        </span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <form
        action={async (formData) => {
          "use server";

          const email = String(formData.get("email") ?? "");
          const password = String(formData.get("password") ?? "");

          await signIn("credentials", {
            email,
            password,
            redirectTo: "/redirect",
          });
        }}
        className="space-y-4"
      >
        <input
          name="email"
          type="email"
          required
          placeholder="Adresse email"
          className="w-full rounded-2xl border border-neutral-300 px-5 py-4 outline-none"
        />

        <input
          name="password"
          type="password"
          required
          placeholder="Mot de passe"
          className="w-full rounded-2xl border border-neutral-300 px-5 py-4 outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-full bg-gray-500 px-6 py-4 text-sm uppercase tracking-widest text-white"
        >
          Se connecter
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-orange-500">
          Créer un compte
        </Link>
      </p>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Votre compte sera créé automatiquement lors de la première connexion.
          </p>
        </div>
      </section>
    </main>
  );
}
