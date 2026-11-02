import Image from "next/image";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export function ImageText({
  image,
  alt,
  eyebrow,
  title,
  children,
  fit = "cover",
  imageFirst = true,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  fit?: "cover" | "contain";
  imageFirst?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className={cx(!imageFirst && "lg:order-2")}>
        <div
          className={cx(
            "relative overflow-hidden rounded-[1.75rem]",
            fit === "contain"
              ? "aspect-[16/10] border border-line bg-white"
              : "aspect-[4/5] bg-muted sm:aspect-[5/4]",
          )}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className={fit === "contain" ? "object-contain p-4" : "object-cover"}
          />
        </div>
      </div>
      <div className={cx(!imageFirst && "lg:order-1")}>
        {eyebrow ? (
          <p className="text-sm font-semibold text-petroleum">{eyebrow}</p>
        ) : null}
        <h2 className="mt-3 text-3xl text-deep md:text-4xl">{title}</h2>
        <div className="mt-5 space-y-4 text-steel">{children}</div>
      </div>
    </div>
  );
}
