import type { Dictionary } from "@/lib/dictionaries/types";

export function getNavItems(dict: Pick<Dictionary, "nav" | "common">) {
  return [
    { label: dict.common.home, href: "/" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.supplies, href: "/industrial-supplies" },
    { label: dict.nav.engineering, href: "/engineering-services" },
    { label: dict.nav.products, href: "/products" },
    { label: dict.nav.industries, href: "/industries" },
    { label: dict.nav.hermetic, href: "/hermetic-partnership" },
    { label: dict.nav.contact, href: "/contact" },
  ] as const;
}
