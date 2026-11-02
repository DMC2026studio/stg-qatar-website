import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Noto_Kufi_Arabic, Space_Grotesk } from "next/font/google";
import { OrganizationJsonLd } from "@/components/json-ld";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/dictionaries";
import { dirFor, isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, getSiteUrl, languageAlternates } from "@/lib/seo";
import { company } from "@/lib/site";
import "../globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kufi",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const dict = getDictionary(locale);
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.siteName,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    applicationName: "STG Industrial",
    authors: [{ name: company.legalName }],
    creator: company.legalName,
    publisher: company.legalName,
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: languageAlternates("/"),
    },
    openGraph: {
      type: "website",
      siteName: company.legalName,
      locale: locale === "ar" ? "ar_QA" : "en_QA",
      alternateLocale: locale === "ar" ? ["en_QA"] : ["ar_QA"],
      title: dict.meta.siteName,
      description: dict.meta.description,
      url: absoluteUrl(`/${locale}`),
      images: [
        {
          url: absoluteUrl("/images/plant-dusk.jpg"),
          width: 1200,
          height: 630,
          alt: company.legalName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.siteName,
      description: dict.meta.description,
      images: [absoluteUrl("/images/plant-dusk.jpg")],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const dir = dirFor(locale);
  const clientDictionary = {
    common: dict.common,
    nav: dict.nav,
    form: dict.form,
    footer: dict.footer,
    quote: dict.quote,
    partnershipBand: dict.partnershipBand,
  };

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-clip bg-white text-deep">
        <OrganizationJsonLd />
        <LocaleProvider locale={locale} dictionary={clientDictionary}>
          <SiteHeader />
          <main id="content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
