import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { company } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: dict.contactPage.metaTitle,
    description: dict.contactPage.metaDescription,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const t = dict.contactPage;

  return (
    <>
      <PageHero
        title={t.heroTitle}
        description={t.heroDescription}
        image="/images/seal-workshop-02.jpg"
        imageAlt="Mechanical seal components prepared in the workshop."
      />

      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-line bg-muted p-6 md:p-8">
            <h2 className="latin text-2xl text-deep">{company.legalName}</h2>
            <address className="mt-5 space-y-1 text-steel not-italic">
              {company.address.map((line) => (
                <span key={line} className="latin block">
                  {line}
                </span>
              ))}
            </address>
            <ul className="mt-8 space-y-3 text-steel">
              <li>
                <span className="block text-sm font-semibold text-petroleum">{t.telephone}</span>
                <a className="latin text-deep hover:text-petroleum" href={`tel:${company.phoneTel}`}>
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block text-sm font-semibold text-petroleum">{t.email}</span>
                <a className="latin text-deep hover:text-petroleum" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </li>
              <li>
                <span className="block text-sm font-semibold text-petroleum">{t.website}</span>
                <a className="latin text-deep hover:text-petroleum" href={company.websiteUrl}>
                  {company.websiteLabel}
                </a>
              </li>
            </ul>
            <p className="mt-8 text-sm text-steel">
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

          <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl text-deep">{t.formTitle}</h2>
            <p className="mt-3 text-steel">{t.formLead}</p>
            <div className="mt-6">
              <ContactForm idPrefix="contact-page" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
