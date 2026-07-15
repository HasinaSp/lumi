"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LanguageSwitcherProps = {
  currentLocale: "fr" | "en";
};

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function changeLanguage(locale: "fr" | "en") {
    if (locale === currentLocale || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/locale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale }),
      });

      if (!response.ok) {
        throw new Error("Unable to change language");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div
      className="flex rounded-full border border-neutral-300 p-1 dark:border-neutral-700"
      aria-label="Language selector"
    >
      <button
        type="button"
        disabled={loading}
        onClick={() => changeLanguage("fr")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
          currentLocale === "fr"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "text-neutral-500 hover:text-black dark:hover:text-white"
        }`}
      >
        FR
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={() => changeLanguage("en")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
          currentLocale === "en"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "text-neutral-500 hover:text-black dark:hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}