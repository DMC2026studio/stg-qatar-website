"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";
import { getNavItems } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { locale, dict } = useLocale();
  const navItems = getNavItems(dict);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-full border border-line text-petroleum"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? dict.common.closeMenu : dict.common.openMenu}</span>
        <svg viewBox="0 0 20 20" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
          {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
        </svg>
      </button>
      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_18px_40px_rgba(6,37,28,0.08)]"
        >
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-base text-deep last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-wrap items-center gap-4 py-4 sm:justify-end">
              <Button
                href={localePath(locale, "/contact")}
                variant="gold"
                className="w-full sm:w-auto"
                onClick={() => setOpen(false)}
              >
                {dict.common.requestQuote}
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
