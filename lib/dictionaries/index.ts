import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";
import { ar } from "./ar";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ar,
};

export type { Dictionary };
export type { CatalogItem } from "./types";

export function getDictionary(locale: string): Dictionary {
  if (!isLocale(locale)) notFound();
  return dictionaries[locale];
}
