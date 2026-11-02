import Image from "next/image";
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
    path: "/hermetic-partnership",
    title: dict.hermetic.metaTitle,
    description: dict.hermetic.metaDescription,
    image: "/images/canned-motor-cutaway.jpg",
  });
}

export default async function HermeticPartnershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const t = dict.hermetic;

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
          <Button href={localePath(locale, "/contact")} variant="gold">
            {dict.common.discussCannedMotor}
          </Button>
          <Button href={localePath(locale, "/engineering-services")} variant="primary">
            {dict.common.workshopServices}
          </Button>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow={t.partnerEyebrow}
              title={t.partnerTitle}
              description={t.partnerDescription}
            />
            <p className="mt-5 text-steel">{t.partnerBody}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <TextLink href={localePath(locale, "/products")}>{t.cannedProducts}</TextLink>
              <TextLink href={localePath(locale, "/about")}>{dict.common.aboutStg}</TextLink>
            </div>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] border border-line bg-white">
            <Image
              src="/images/canned-motor-cutaway.jpg"
              alt={t.cutawayAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain p-5"
            />
          </div>
        </Container>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow={t.scopeEyebrow}
            title={t.scopeTitle}
            description={t.scopeDescription}
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {dict.content.seallessExpertise.map((item) => (
              <article
                key={item}
                className="rounded-[1.5rem] border border-line bg-white px-6 py-5 text-deep"
              >
                {item}
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-4 overflow-hidden rounded-[2rem] border border-line bg-white md:grid-cols-2">
            <div className="relative min-h-56">
              <Image
                src="/images/workshop-before.jpg"
                alt={t.beforeAlt}
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-56">
              <Image
                src="/images/workshop-after.jpg"
                alt={t.afterAlt}
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-12">
            <QuoteCta text={t.cta} />
          </div>
        </Container>
      </section>
    </>
  );
}
