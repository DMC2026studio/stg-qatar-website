import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, TextLink } from "@/components/button";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { withImage, withoutImage } from "@/lib/content";
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
    path: "/industrial-supplies",
    title: dict.supplies.metaTitle,
    description: dict.supplies.metaDescription,
    image: "/images/supply-steel.jpg",
  });
}

export default async function IndustrialSuppliesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const t = dict.supplies;
  const withImages = withImage(dict.content.supplyCategories);
  const textOnly = withoutImage(dict.content.supplyCategories);
  const contactHref = localePath(locale, "/contact");

  return (
    <>
      <PageHero
        title={t.heroTitle}
        description={t.heroDescription}
        crumbs={[
          { label: dict.common.home, href: localePath(locale, "/") },
          { label: t.metaTitle },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={contactHref} variant="gold">
            {dict.common.requestQuote}
          </Button>
          <Button href={localePath(locale, "/engineering-services")} variant="primary">
            {dict.common.engineeringServices}
          </Button>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow={t.categoriesEyebrow}
            title={t.categoriesTitle}
            description={t.categoriesDescription}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {withImages.map((item) => (
              <ProductCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                alt={item.alt}
                href={contactHref}
                linkLabel={dict.common.requestQuote}
              />
            ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {textOnly.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-line bg-white p-6"
              >
                <h3 className="text-xl text-deep">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{item.description}</p>
                <div className="mt-5">
                  <TextLink href={contactHref}>{dict.common.requestQuote}</TextLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={t.safetyEyebrow}
              title={t.safetyTitle}
              description={t.safetyDescription}
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <TextLink href={localePath(locale, "/products")}>
                {dict.common.productsEquipment}
              </TextLink>
              <TextLink href={localePath(locale, "/industries")}>
                {dict.common.industriesServed}
              </TextLink>
            </div>
          </div>
          <QuoteCta text={t.cta} />
        </Container>
      </section>
    </>
  );
}
