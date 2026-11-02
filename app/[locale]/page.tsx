import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, TextLink } from "@/components/button";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { PartnershipBand } from "@/components/partnership-band";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { company } from "@/lib/site";

const capabilityIcons = [
  (
    <svg key="repair" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M14.7 6.3a4 4 0 0 1 0 5.7L9 18H6v-3l5.7-5.7a4 4 0 0 1 5.7 0Z" />
      <path d="M15 7l2 2" />
    </svg>
  ),
  (
    <svg key="seal" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </svg>
  ),
  (
    <svg key="supply" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16v12H4z" />
      <path d="M8 7V5h8v2" />
    </svg>
  ),
  (
    <svg key="mech" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  (
    <svg key="motor" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 7h10v10H7z" />
      <path d="M10 17v3h4v-3M9 7V4h6v3" />
    </svg>
  ),
  (
    <svg key="test" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 19h16" />
      <path d="M7 19V9l5-4 5 4v10" />
    </svg>
  ),
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    ...buildPageMetadata({
      locale,
      path: "/",
      title: dict.meta.siteName,
      description: dict.home.metaDescription,
      image: "/images/canned-motor-assembly.jpg",
    }),
    title: dict.home.metaTitle,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const t = dict.home;
  const contactHref = localePath(locale, "/contact");

  return (
    <>
      <section className="relative overflow-hidden bg-deep min-h-[min(100svh-var(--header-height),42rem)] lg:min-h-[calc(100svh-var(--header-height))]">
        <Image
          src="/images/canned-motor-assembly.jpg"
          alt={t.alts.hero}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/88 via-deep/70 to-deep/45 rtl:bg-gradient-to-l" />
        <Container className="relative grid min-h-[min(100svh-var(--header-height),42rem)] items-center gap-8 py-12 md:gap-10 md:py-16 lg:min-h-[calc(100svh-var(--header-height))] lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-semibold tracking-wide text-gold">
              {dict.common.stgDohaQatar}
            </p>
            <h1 className="mt-4 text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{t.heroLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={contactHref} variant="gold">
                {dict.common.requestQuote}
              </Button>
              <Button href={localePath(locale, "/engineering-services")} variant="secondary">
                {dict.common.exploreCapabilities}
              </Button>
            </div>
          </div>
          <div className="hidden rounded-[1.75rem] bg-white p-6 shadow-2xl shadow-black/20 lg:block md:p-7">
            <h2 className="text-2xl text-deep">{t.heroFormTitle}</h2>
            <p className="mt-2 text-sm text-steel">{t.heroFormLead}</p>
            <div className="mt-5">
              <ContactForm compact idPrefix="hero" />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-muted">
        <Container className="flex flex-col gap-3 py-5 text-sm text-steel sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <p className="font-medium text-deep">{dict.common.authorizedPartner}</p>
          <p className="max-w-xl leading-relaxed">
            <span className="latin font-semibold text-petroleum">HERMETIC-Pumpen GmbH</span>
            <span className="mx-2 text-line">|</span>
            {t.partnerLine}
          </p>
          <TextLink href={localePath(locale, "/hermetic-partnership")}>
            {dict.common.partnershipDetails}
          </TextLink>
        </Container>
      </section>

      <section id="about" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/plant-dusk.jpg"
                  alt={t.alts.plant}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/images/workshop-before.jpg"
                  alt={t.alts.before}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/images/workshop-after.jpg"
                  alt={t.alts.after}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-petroleum">{t.aboutEyebrow}</p>
              <h2 className="mt-3 text-3xl text-deep md:text-4xl">{t.aboutTitle}</h2>
              <p className="mt-5 text-steel">{t.aboutP1}</p>
              <p className="mt-4 text-steel">{t.aboutP2}</p>
              <p className="mt-6 border-s-4 border-gold ps-4 text-lg text-deep">“{t.mission}”</p>
              <div className="mt-8">
                <Button href={contactHref} variant="gold">
                  {dict.common.requestQuote}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="engineering" className="scroll-mt-24 bg-muted py-16 md:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow={t.capabilitiesEyebrow}
            title={t.capabilitiesTitle}
            description={t.capabilitiesDescription}
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.capabilities.map((item, index) => (
              <ServiceCard
                key={item.title}
                title={item.title}
                description={item.description}
                active={item.active}
                icon={capabilityIcons[index]}
                href={contactHref}
                linkLabel={dict.common.requestQuote}
              />
            ))}
          </div>
        </Container>
      </section>

      <section id="products" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow={t.productsEyebrow}
            title={t.productsTitle}
            description={t.productsDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.pumps.map((item) => (
              <ProductCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image!}
                alt={item.alt!}
                href={contactHref}
                linkLabel={dict.common.requestQuote}
              />
            ))}
          </div>
          <div className="mt-12 grid items-center gap-8 overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-2">
            <div className="relative min-h-72 bg-muted lg:min-h-full">
              <Image
                src="/images/canned-motor-cutaway.jpg"
                alt={t.alts.cutaway}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain p-6"
              />
            </div>
            <div className="p-6 md:p-10">
              <p className="text-sm font-semibold text-petroleum">{t.cannedEyebrow}</p>
              <h3 className="mt-3 text-3xl text-deep">{t.cannedTitle}</h3>
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

      <section id="expertise" className="scroll-mt-24 bg-deep py-16 text-white md:py-24">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow={t.expertiseEyebrow}
            title={t.expertiseTitle}
            description={t.expertiseDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-gold text-deep">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <h3 className="text-xl text-white">{reason.title}</h3>
                <p className="mt-3 text-white/75">{reason.text}</p>
              </article>
            ))}
          </div>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[2rem] md:aspect-[21/9]">
            <Image
              src="/images/canned-motor-assembly.jpg"
              alt={t.alts.assembly}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section id="supplies" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow={t.suppliesEyebrow}
            title={t.suppliesTitle}
            description={t.suppliesDescription}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.supplies.map((item) => (
              <ProductCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image!}
                alt={item.alt!}
                href={contactHref}
                linkLabel={dict.common.requestQuote}
              />
            ))}
          </div>
        </Container>
      </section>

      <PartnershipBand />

      <section id="industries" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow={t.industriesEyebrow}
            title={t.industriesTitle}
            description={t.industriesDescription}
            className="mb-10"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.industries.map((industry) => (
              <li
                key={industry}
                className="rounded-[1.5rem] border border-line bg-muted px-6 py-8 text-center"
              >
                <h3 className="text-2xl text-deep">{industry}</h3>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-24 bg-muted py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <QuoteCta href="/contact" />
            <div className="mt-8 space-y-2 text-sm text-steel">
              <p className="latin font-medium text-deep">{company.legalName}</p>
              <p className="latin">{company.address.join(" ")}</p>
              <p>
                <a className="latin text-petroleum" href={`tel:${company.phoneTel}`}>
                  {company.phoneDisplay}
                </a>
                {" · "}
                <a className="latin text-petroleum" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
            </div>
          </div>
          <div id="enquiry" className="scroll-mt-28 rounded-[1.75rem] border border-line bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl text-deep">{t.contactTitle}</h2>
            <div className="mt-6">
              <ContactForm idPrefix="page" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
