import type { MetadataRoute } from "next";
import { languageAlternates, localizedUrl, sitePaths } from "@/lib/seo";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    sitePaths.map((path) => ({
      url: localizedUrl(locale, path),
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path === "/contact" ? 0.9 : 0.7,
      alternates: {
        languages: languageAlternates(path),
      },
    })),
  );
}
