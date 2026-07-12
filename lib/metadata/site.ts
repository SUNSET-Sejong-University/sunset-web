import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildLanguageAlternates } from "@/lib/utils/paths";

export function createSiteMetadata(
  locale: Locale,
  {
    title,
    description,
    path = "",
  }: {
    title: string;
    description: string;
    path?: string;
  },
): Metadata {
  const dictionary = getDictionary(locale);
  const suffix = path ? `/${path.replace(/^\//, "")}` : "";
  const canonicalPath = `/${locale}${suffix}`;
  const alternates = buildLanguageAlternates(path);

  return {
    title: `${title} · ${dictionary.site.name}`,
    description,
    alternates: {
      canonical: `${getSiteUrl()}${canonicalPath}`,
      languages: alternates,
    },
    openGraph: {
      title: `${title} · ${dictionary.site.name}`,
      description,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
      type: "website",
      url: `${getSiteUrl()}${canonicalPath}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${dictionary.site.name}`,
      description,
    },
  };
}

export function organizationJsonLd(locale: Locale) {
  const dictionary = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dictionary.site.name,
    description: dictionary.site.descriptor,
    url: getSiteUrl(),
    sameAs: ["https://github.com/SUNSET-Sejong-University"],
  };
}

export function projectJsonLd(
  locale: Locale,
  project: {
    name: string;
    summary: string;
    slug: string;
    repositories: readonly { url: string }[];
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.summary,
    url: `${getSiteUrl()}/${locale}/projects/${project.slug}`,
    codeRepository: project.repositories[0]?.url,
    programmingLanguage: "Multiple",
  };
}
