"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";
import { getNavItems } from "@/lib/nav";
import { company } from "@/lib/site";

export function SiteFooter() {
  const { locale, dict } = useLocale();
  const navItems = getNavItems(dict);

  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <BrandLogo tone="dark" />
          <p
            lang={locale === "ar" ? "en" : "ar"}
            dir={locale === "ar" ? "ltr" : "rtl"}
            className="mt-5 max-w-sm text-sm text-white/70"
          >
            {locale === "ar" ? company.legalName : company.arabicName}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {dict.footer.tagline}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-gold">{dict.footer.visit}</h2>
          <address className="mt-4 text-sm leading-relaxed text-white/75 not-italic">
            {company.address.map((line) => (
              <span key={line} className="latin block">
                {line}
              </span>
            ))}
          </address>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-gold">{dict.footer.contact}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="latin hover:text-gold" href={`tel:${company.phoneTel}`}>
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="latin hover:text-gold" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </li>
            <li>
              <a className="latin hover:text-gold" href={company.websiteUrl}>
                {company.websiteLabel}
              </a>
            </li>
          </ul>
          <h2 className="mt-8 text-sm font-semibold tracking-wide text-gold">{dict.footer.explore}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(locale, item.href)}
                  className="text-white/75 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © 2026 <span className="latin">{company.legalName}</span> {dict.footer.rights}
          </p>
          <p>
            {locale === "ar" ? (
              <>
                الشريك المعتمد لـ <span className="latin">HERMETIC-Pumpen GmbH</span>، ألمانيا.
              </>
            ) : (
              <>
                Authorized partner of <span className="latin">HERMETIC-Pumpen GmbH</span>, Germany.
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
