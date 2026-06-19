"use client";

import { useState } from "react";

type AuditRequestFormProps = {
  offer: string;
  price: string;
};

export function AuditForm({ offer, price }: AuditRequestFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    restaurant: "",
    city: "",
    platform: "UberEats",
    link: "",
    message: "",
  });

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(`Demande ${offer} - ${form.restaurant}`);

    const body = encodeURIComponent(`
Offre : ${offer}
Prix : ${price}

Nom : ${form.name}
Email : ${form.email}
Téléphone : ${form.phone}

Restaurant : ${form.restaurant}
Ville : ${form.city}
Plateforme : ${form.platform}
Lien : ${form.link}

Message :
${form.message}
`);

    window.location.href = `mailto:speyerhasina@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Votre nom" onChange={updateField} className="rounded-2xl border px-5 py-4" />
        <input name="email" type="email" required placeholder="Email" onChange={updateField} className="rounded-2xl border px-5 py-4" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input name="phone" placeholder="Téléphone" onChange={updateField} className="rounded-2xl border px-5 py-4" />
        <input name="restaurant" required placeholder="Nom du restaurant" onChange={updateField} className="rounded-2xl border px-5 py-4" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input name="city" required placeholder="Ville" onChange={updateField} className="rounded-2xl border px-5 py-4" />

        <select name="platform" onChange={updateField} className="rounded-2xl border px-5 py-4">
          <option>UberEats</option>
          <option>Deliveroo</option>
          <option>UberEats + Deliveroo</option>
        </select>
      </div>

      <input
        name="link"
        required
        placeholder="Lien de votre fiche UberEats / Deliveroo"
        onChange={updateField}
        className="rounded-2xl border px-5 py-4"
      />

      <textarea
        name="message"
        placeholder="Message ou objectif principal"
        rows={5}
        onChange={updateField}
        className="rounded-2xl border px-5 py-4"
      />

      <button
        type="submit"
        className="rounded-full bg-black px-8 py-4 text-sm uppercase tracking-widest text-white"
      >
        Envoyer ma demande
      </button>
    </form>
  );
}