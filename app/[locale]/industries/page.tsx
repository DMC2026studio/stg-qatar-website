import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, TextLink } from "@/components/button";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

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
    path: "/industries",
    title: dict.industriesPage.metaTitle,
    description: dict.industriesPage.metaDescription,
  });
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const t = dict.industriesPage;

  return (
    <>
      <PageHero
        title={t.heroTitle}
        description={t.heroDescription}
        image="/images/heroes/hero-industries-plant.jpg"
        imageAlt={t.plantAlt}
      >
        <Button href={localePath(locale, "/contact")} variant="gold">
          {dict.common.requestQuote}
        </Button>
      </PageHero>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow={t.sectionEyebrow}
            title={t.sectionTitle}
            description={t.sectionDescription}
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {dict.content.industries.map((industry) => (
              <article
                key={industry.title}
                className="rounded-[1.75rem] border border-line bg-white p-7 md:p-8"
              >
                <h2 className="text-3xl text-deep">{industry.title}</h2>
                <p className="mt-4 text-steel">{industry.description}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <TextLink href={localePath(locale, "/engineering-services")}>
                    {dict.common.engineeringServices}
                  </TextLink>
                  <TextLink href={localePath(locale, "/industrial-supplies")}>
                    {dict.common.industrialSupplies}
                  </TextLink>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <QuoteCta text={t.cta} />
          </div>
        </Container>
      </section>
    </>
  );
}
