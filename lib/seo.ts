import type { Metadata } from "next";
import { localePath, locales, type Locale } from "@/lib/i18n";
import { company, navHrefs } from "@/lib/site";

export const sitePaths = ["/", ...navHrefs] as const;

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return company.websiteUrl.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localizedUrl(locale: Locale, path = "/") {
  return absoluteUrl(localePath(locale, path));
}

export function languageAlternates(path = "/") {
  const languages: Record<string, string> = {
    en: localizedUrl("en", path),
    ar: localizedUrl("ar", path),
    "x-default": localizedUrl("en", path),
  };
  return languages;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image = "/images/plant-dusk.jpg",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const canonical = localizedUrl(locale, path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_QA" : "en_QA",
      alternateLocale: locale === "ar" ? ["en_QA"] : ["ar_QA"],
      url: canonical,
      siteName: company.legalName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: company.legalName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function allLocalizedRoutes() {
  return locales.flatMap((locale) =>
    sitePaths.map((path) => ({
      locale,
      path,
      url: localizedUrl(locale, path),
    })),
  );
}
