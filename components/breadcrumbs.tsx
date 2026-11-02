import Link from "next/link";
import { cx } from "@/lib/cx";

export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: { label: string; href?: string }[];
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cx(
          "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm",
          light ? "text-white/70" : "text-steel",
        )}
      >
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden className="text-gold">
                  /
                </span>
              ) : null}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={light ? "hover:text-white" : "hover:text-petroleum"}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={light ? "text-white" : "text-deep"}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
