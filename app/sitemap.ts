import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/content/site";
import { getAllProjectSlugs } from "@/lib/content/projects";
import { locales } from "@/lib/i18n/locales";

const staticSegments = ["", "projects", "people", "people/structure", "timeline", "about", "join"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const projectSlugs = getAllProjectSlugs();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const segment of staticSegments) {
      entries.push({
        url: `${base}/${lang}${segment ? `/${segment}` : ""}`,
        changeFrequency: segment === "" ? "weekly" : "monthly",
        priority: segment === "" ? 1 : 0.8,
      });
    }

    for (const slug of projectSlugs) {
      entries.push({
        url: `${base}/${lang}/projects/${slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
