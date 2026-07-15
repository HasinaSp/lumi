// src/lib/locale.ts

import { cookies } from "next/headers";

import {
  dictionaries,
  type Locale,
} from "src/i18n/dictionaries";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get("LUMI_LOCALE")?.value;

  return value === "en" ? "en" : "fr";
}

export async function getDictionary() {
  const locale = await getLocale();

  return {
    locale,
    dictionary: dictionaries[locale],
  };
}