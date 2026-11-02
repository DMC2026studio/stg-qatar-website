import { cx } from "@/lib/cx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  tone = "dark",
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  tone?: "dark" | "light";
  align?: "start" | "center";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <header
      className={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cx(
            "text-sm font-semibold tracking-wide",
            light ? "text-gold" : "text-petroleum",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cx(
          "mt-3 text-3xl md:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-deep",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cx(
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-white/75" : "text-steel",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
