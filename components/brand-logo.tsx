"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";
import { company } from "@/lib/site";

export function BrandLogo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { locale } = useLocale();
  const arabic = locale === "ar";
  const src = arabic
    ? tone === "dark"
      ? "/brand/logo-arabic-reverse.png"
      : "/brand/logo-arabic.png"
    : tone === "dark"
      ? "/brand/logo-horizontal-reverse.png"
      : "/brand/logo-horizontal.png";

  return (
    <Link
      href={localePath(locale, "/")}
      className="inline-flex shrink-0 items-center"
      aria-label={company.legalName}
    >
      <Image
        src={src}
        alt=""
        width={720}
        height={arabic ? 247 : 145}
        priority={tone === "light"}
        className={
          arabic
            ? "h-10 w-auto max-w-[42vw] sm:h-12 sm:max-w-[220px] md:max-w-none"
            : "h-9 w-auto max-w-[48vw] sm:h-10 sm:max-w-[200px] md:h-11 md:max-w-none"
        }
      />
    </Link>
  );
}
