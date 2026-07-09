// src/app/audit/new/AuditCheckoutForm.tsx
"use client";

import { useState } from "react";

type Props = {
  selectedOffer: "SIMPLE" | "COMPLETE" | "MONTHLY";
  selectedOfferLabel: string;
};

export default function AuditCheckoutForm({
  selectedOffer,
  selectedOfferLabel,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offer: selectedOffer,
        restaurantName: formData.get("restaurantName"),
        city: formData.get("city"),
        platform: formData.get("platform"),
        marketplaceUrl: formData.get("marketplaceUrl"),
        message: formData.get("message"),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.url) {
      alert(data.error ?? "Erreur lors de la création du paiement.");
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-4 rounded-3xl bg-white p-8 shadow-sm"
    >
      <div className="rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-700">
        Offre sélectionnée : <strong>{selectedOfferLabel}</strong>
      </div>

      <input
        name="restaurantName"
        required
        placeholder="Nom du restaurant"
        className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none"
      />

      <input
        name="city"
        placeholder="Ville"
        className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none"
      />

      <select
        name="platform"
        className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 outline-none"
      >
        <option value="UBEREATS">Uber Eats</option>
        <option value="DELIVEROO">Deliveroo</option>
        <option value="BOTH">Uber Eats + Deliveroo</option>
      </select>

      <input
        name="marketplaceUrl"
        placeholder="Lien Uber Eats / Deliveroo"
        className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none"
      />

      <textarea
        name="message"
        rows={5}
        placeholder="Message ou objectif principal"
        className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-400 outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-black px-6 py-4 text-sm uppercase tracking-widest text-white disabled:opacity-50"
      >
        {loading ? "Redirection..." : "Continuer vers le paiement"}
      </button>
    </form>
  );
}
