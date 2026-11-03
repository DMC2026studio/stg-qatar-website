import Image from "next/image";
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
    path: "/products",
    title: dict.products.metaTitle,
    description: dict.products.metaDescription,
    image: "/images/pump-centrifugal.jpg",
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const t = dict.products;
  const pumpPhotos = withImage(dict.content.pumpTypes);
  const pumpText = withoutImage(dict.content.pumpTypes);
  const contactHref = localePath(locale, "/contact");

  return (
    <>
      <PageHero
        title={t.heroTitle}
        description={t.heroDescription}
        image="/images/heroes/hero-products-equipment.jpg"
        imageAlt="Technician servicing industrial equipment in the workshop."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={contactHref} variant="gold">
            {dict.common.requestQuote}
          </Button>
          <Button href={localePath(locale, "/engineering-services")} variant="secondary">
            {dict.common.workshopServices}
          </Button>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow={t.pumpsEyebrow}
            title={t.pumpsTitle}
            description={t.pumpsDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pumpPhotos.map((item) => (
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
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pumpText.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-line bg-muted p-6"
              >
                <h3 className="latin text-xl text-deep">{item.title}</h3>
                <p className="mt-3 text-sm text-steel">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-2">
            <div className="relative min-h-80 bg-white">
              <Image
                src="/images/canned-motor-cutaway.jpg"
                alt={t.cutawayAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain p-6"
              />
            </div>
            <div className="p-6 md:p-10">
              <p className="text-sm font-semibold text-petroleum">{t.cannedEyebrow}</p>
              <h2 className="mt-3 text-3xl text-deep">{t.cannedTitle}</h2>
              <p className="mt-4 text-steel">{t.cannedBody}</p>
              <div className="mt-6">
                <TextLink href={localePath(locale, "/hermetic-partnership")}>
                  {dict.common.hermeticPartnership}
                </TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow={t.sealsEyebrow}
            title={t.sealsTitle}
            description={t.sealsDescription}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.content.sealTypes.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-line bg-white p-6"
              >
                <h3 className="text-xl text-deep">{item.title}</h3>
                <p className="mt-3 text-sm text-steel">{item.description}</p>
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
