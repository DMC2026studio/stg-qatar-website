import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

type Variant = "primary" | "secondary" | "gold" | "ghost" | "dark";

const variants: Record<Variant, string> = {
  primary: "bg-petroleum text-white hover:bg-deep",
  secondary:
    "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-deep",
  gold: "bg-gold text-deep hover:brightness-95",
  ghost: "bg-transparent text-petroleum hover:text-deep",
  dark: "bg-deep text-white hover:bg-petroleum",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50";

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className="size-3.5 rtl:-scale-x-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type Common = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = Common & {
  href: string;
  onClick?: () => void;
};

export function Button(props: ButtonProps | LinkProps) {
  const classes = cx(base, variants[props.variant ?? "primary"], props.className);
  if (props.href) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  }
  const { variant, className, children, ...rest } = props;
  void variant;
  void className;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center gap-2 text-sm font-semibold text-petroleum hover:text-deep",
        className,
      )}
    >
      {children}
      <Arrow />
    </Link>
  );
}
