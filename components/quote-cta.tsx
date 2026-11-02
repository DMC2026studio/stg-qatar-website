"use client";

import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";
import { cx } from "@/lib/cx";
import { localePath } from "@/lib/i18n";

export function QuoteCta({
  title,
  text,
  href = "/contact",
}: {
  title?: string;
  text?: string;
  href?: string;
}) {
  const { locale, dict } = useLocale();

  return (
    <div className="overflow-hidden rounded-[2rem] bg-deep px-6 py-10 text-white md:px-10 md:py-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2
            className={cx(
              "text-3xl tracking-tight text-white sm:text-4xl md:text-5xl",
              locale === "en" && "uppercase",
            )}
          >
            {title ?? dict.quote.title}
          </h2>
          <p className="mt-4 text-white/75">{text ?? dict.quote.defaultText}</p>
        </div>
        <Button href={localePath(locale, href)} variant="gold" className="w-full shrink-0 sm:w-auto">
          {dict.common.requestQuote}
        </Button>
      </div>
    </div>
  );
}
