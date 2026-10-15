import { notFound } from "next/navigation";

import { OrgStructureSections } from "@/components/people/org-structure-sections";
import { createSiteMetadata } from "@/lib/metadata/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/locales";

type OrgStructurePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: OrgStructurePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  return createSiteMetadata(locale, {
    title: dictionary.orgStructurePage.title,
    description: dictionary.orgStructurePage.description,
    path: "people/structure",
  });
}

export default async function OrgStructurePage({ params }: OrgStructurePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return <OrgStructureSections locale={locale} dictionary={dictionary} />;
}
