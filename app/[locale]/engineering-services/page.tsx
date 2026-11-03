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
    path: "/engineering-services",
    title: dict.engineering.metaTitle,
    description: dict.engineering.metaDescription,
    image: "/images/canned-motor-assembly.jpg",
  });
}

export default async function EngineeringServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const t = dict.engineering;
  const c = dict.content;

  return (
    <>
      <PageHero
        title={t.heroTitle}
        description={t.heroDescription}
        image="/images/heroes/hero-engineering-workshop.jpg"
        imageAlt={t.alts.seals}
      >
        <Button href={localePath(locale, "/contact")} variant="gold">
          {dict.common.requestQuote}
        </Button>
      </PageHero>

      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow={t.workshopEyebrow}
              title={t.workshopTitle}
              description={t.workshopDescription}
            />
            <p className="mt-5 text-steel">{t.lvNote}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <TextLink href={localePath(locale, "/hermetic-partnership")}>
                {dict.common.hermeticPartnership}
              </TextLink>
              <TextLink href={localePath(locale, "/products")}>
                {dict.common.productsEquipment}
              </TextLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/sections/section-machinery.jpg"
                alt={t.alts.before}
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/sections/section-assembly.jpg"
                alt={t.alts.after}
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/sections/section-plant-pipes.jpg"
                alt={t.alts.seals}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow={t.seallessEyebrow}
                title={t.seallessTitle}
                description={t.seallessDescription}
              />
              <ul className="mt-6 space-y-3">
                {c.seallessExpertise.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-line bg-white px-5 py-4 text-steel"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading
                eyebrow={t.motorEyebrow}
                title={t.motorTitle}
                description={t.motorDescription}
              />
              <ul className="mt-6 space-y-3">
                {c.motorRepair.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-line bg-white px-5 py-4 text-steel"
                  >
                    {item}
                  </li>
                ))}
              </ul>
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
          <p className="mt-5 max-w-3xl text-steel">{t.sealsBody}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {c.sealServices.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-line bg-white p-6"
              >
                <h3 className="text-xl text-deep">{item.title}</h3>
                <p className="mt-3 text-sm text-steel">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.sealTypes.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-line bg-muted p-6"
              >
                <h3 className="text-lg text-deep">{item.title}</h3>
                <p className="mt-2 text-sm text-steel">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {c.workshopTesting.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-line bg-white p-6"
              >
                <h3 className="text-lg text-deep">{item.title}</h3>
                <p className="mt-2 text-sm text-steel">{item.description}</p>
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
