"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";
import { getNavItems } from "@/lib/nav";

export function SiteHeader() {
  const { locale, dict } = useLocale();
  const navItems = getNavItems(dict);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-3 focus:py-2"
      >
        {dict.common.skipToContent}
      </a>
      <div className="relative mx-auto flex h-[var(--header-height)] max-w-7xl items-center gap-2 px-3 sm:px-4 md:px-6 lg:gap-3">
        <BrandLogo />
        <div className="ms-auto flex min-w-0 items-center gap-1.5 sm:gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-x-1 lg:flex xl:gap-x-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                className="rounded-md px-2 py-1 text-[12px] font-medium leading-none text-steel hover:bg-muted hover:text-petroleum xl:px-2.5 xl:text-[13px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
          <div className="hidden sm:block">
            <Button href={localePath(locale, "/contact")} variant="gold" className="px-3 py-1.5 text-xs">
              {dict.common.requestQuote}
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
