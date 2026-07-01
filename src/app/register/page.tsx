import Link from "next/link";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "").toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) return;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      redirect("/login");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role:
          email === process.env.ADMIN_EMAIL?.toLowerCase()
            ? "ADMIN"
            : "CLIENT",
      },
    });

    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f7f3] px-6">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-neutral-900 shadow-sm">
        <Link href="/" className="text-sm text-neutral-500">
          ← Retour
        </Link>

        <h1 className="mt-10 text-4xl font-semibold">Créer un compte</h1>

        <form action={register} className="mt-8 space-y-4">
          <input
            name="name"
            placeholder="Nom"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-black"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-black"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Mot de passe"
            autoComplete="new-password"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-black"
          />

          <button className="w-full rounded-full bg-black px-6 py-4 text-sm uppercase tracking-widest text-white">
            Créer mon compte
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-black">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}