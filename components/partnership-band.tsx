"use client";

import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";

export function PartnershipBand() {
  const { locale, dict } = useLocale();

  return (
    <section id="partnership" className="scroll-mt-24 bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-petroleum px-6 py-12 text-white md:px-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-gold">{dict.common.authorizedPartner}</p>
              <h2 className="mt-3 text-3xl text-white md:text-4xl">
                <span className="latin">HERMETIC-Pumpen GmbH</span>
              </h2>
              <p className="mt-2 text-white/70">{locale === "ar" ? "ألمانيا" : "Germany"}</p>
            </div>
            <div>
              <p className="max-w-xl text-lg leading-relaxed text-white/80">
                {dict.partnershipBand.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href={localePath(locale, "/hermetic-partnership")}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  {dict.common.partnershipDetails}
                </Button>
                <Button
                  href={localePath(locale, "/contact")}
                  variant="gold"
                  className="w-full sm:w-auto"
                >
                  {dict.common.discussCannedMotor}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
