"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { cx } from "@/lib/cx";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";

const options: { id: Locale; label: string; lang: string }[] = [
  { id: "en", label: "EN", lang: "en" },
  { id: "ar", label: "العربية", lang: "ar" },
];

export function LanguageSwitcher() {
  const { locale, dict } = useLocale();
  const pathname = usePathname() || "/";
  const bare = stripLocale(pathname);

  return (
    <div
      role="group"
      aria-label={dict.common.language}
      className="inline-flex items-center overflow-hidden rounded-full border border-line bg-white"
    >
      {options.map((option) => {
        const active = locale === option.id;
        return (
          <Link
            key={option.id}
            href={localePath(option.id, bare)}
            lang={option.lang}
            hrefLang={option.lang}
            aria-current={active ? "page" : undefined}
            className={cx(
              "inline-flex h-7 items-center px-2 text-[11px] font-semibold tracking-wide",
              active ? "bg-petroleum text-white" : "text-steel hover:text-petroleum",
            )}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${option.id};path=/;max-age=31536000;samesite=lax`;
            }}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
