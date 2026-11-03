import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, TextLink } from "@/components/button";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
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
    path: "/about",
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const t = dict.about;
  const contactHref = localePath(locale, "/contact");

  return (
    <>
      <PageHero
        title={t.heroTitle}
        description={t.heroDescription}
        image="/images/heroes/hero-about-facility.jpg"
        imageAlt={t.alts.plant}
      >
        <Button href={contactHref} variant="gold">
          {dict.common.requestQuote}
        </Button>
      </PageHero>

      <section className="py-16 md:py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow={t.whoEyebrow}
              title={company.legalName}
              description={t.whoDescription}
            />
            <p className="mt-6 text-steel">{t.body}</p>
            <p className="mt-6 border-s-4 border-gold ps-4 text-lg text-deep">“{t.mission}”</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <TextLink href={localePath(locale, "/engineering-services")}>
                {dict.common.engineeringServices}
              </TextLink>
              <TextLink href={localePath(locale, "/industrial-supplies")}>
                {dict.common.industrialSupplies}
              </TextLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/sections/section-facility.jpg"
                alt={t.alts.assembly}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/sections/section-workshop-tech.jpg"
                alt={t.alts.before}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/sections/section-precision.jpg"
                alt={t.alts.after}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow={t.pillarsEyebrow}
            title={t.pillarsTitle}
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {dict.content.pillars.map((item, index) => (
              <ServiceCard
                key={item.title}
                title={item.title}
                description={item.description}
                active={index === 1}
                href={contactHref}
                linkLabel={dict.common.requestQuote}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow={t.whyEyebrow}
            title={t.whyTitle}
            description={t.whyDescription}
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {dict.content.reasons.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-line bg-white p-6 md:p-7"
              >
                <h3 className="text-xl text-deep">{item.title}</h3>
                <p className="mt-3 text-steel">{item.description}</p>
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
