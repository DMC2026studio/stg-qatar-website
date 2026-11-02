import type { ReactNode } from "react";
import { TextLink } from "@/components/button";
import { cx } from "@/lib/cx";

export function ServiceCard({
  title,
  description,
  href,
  linkLabel = "Request a quote",
  active = false,
  icon,
}: {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  active?: boolean;
  icon?: ReactNode;
}) {
  return (
    <article
      className={cx(
        "flex h-full flex-col rounded-[1.5rem] border p-6 transition-colors md:p-7",
        active
          ? "border-deep bg-deep text-white shadow-lg shadow-deep/10"
          : "border-line bg-white text-deep hover:border-petroleum/30",
      )}
    >
      {icon ? (
        <div
          className={cx(
            "mb-5 flex size-12 items-center justify-center rounded-full",
            active ? "bg-gold text-deep" : "bg-gold/20 text-petroleum",
          )}
        >
          {icon}
        </div>
      ) : null}
      <h3 className={cx("text-xl", active ? "text-white" : "text-deep")}>{title}</h3>
      <p className={cx("mt-3 flex-1 leading-relaxed", active ? "text-white/80" : "text-steel")}>
        {description}
      </p>
      {href ? (
        <div className="mt-6">
          <TextLink href={href} className={active ? "text-gold hover:text-white" : undefined}>
            {linkLabel}
          </TextLink>
        </div>
      ) : null}
    </article>
  );
}
