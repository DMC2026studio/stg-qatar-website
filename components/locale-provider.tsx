"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import { dirFor } from "@/lib/i18n";

export type ClientDictionary = Pick<
  Dictionary,
  "common" | "nav" | "form" | "footer" | "quote" | "partnershipBand"
>;

type LocaleContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  dict: ClientDictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: ClientDictionary;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider
      value={{
        locale,
        dir: dirFor(locale),
        dict: dictionary,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return value;
}

export type { Locale };
