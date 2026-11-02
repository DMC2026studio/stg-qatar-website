"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { useLocale } from "@/components/locale-provider";
import { cx } from "@/lib/cx";

export function PageHero({
  title,
  description,
  crumbs,
  image,
  imageAlt,
  children,
}: {
  title: string;
  description: string;
  crumbs: { label: string; href?: string }[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  const { dict } = useLocale();

  return (
    <section className={cx("border-b border-line", image ? "relative overflow-hidden bg-deep" : "bg-muted")}>
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/88 via-deep/72 to-deep/45 rtl:bg-gradient-to-l" />
        </>
      ) : null}
      <Container className={cx("relative py-12 md:py-16", image && "text-white")}>
        <Breadcrumbs items={crumbs} tone={image ? "light" : "dark"} />
        <p
          className={cx(
            "mt-8 text-sm font-semibold",
            image ? "text-gold" : "text-petroleum",
          )}
        >
          {dict.common.stgDoha}
        </p>
        <h1
          className={cx(
            "mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl",
            image ? "text-white" : "text-deep",
          )}
        >
          {title}
        </h1>
        <p
          className={cx(
            "mt-5 max-w-2xl text-lg leading-relaxed",
            image ? "text-white/80" : "text-steel",
          )}
        >
          {description}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
