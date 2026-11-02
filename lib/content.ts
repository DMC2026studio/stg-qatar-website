import type { CatalogItem } from "@/lib/dictionaries/types";

export type { CatalogItem };

export function withImage(
  items: CatalogItem[],
): Array<CatalogItem & { image: string; alt: string }> {
  return items.filter(
    (item): item is CatalogItem & { image: string; alt: string } =>
      Boolean(item.image && item.alt),
  );
}

export function withoutImage(items: CatalogItem[]) {
  return items.filter((item) => !item.image);
}
