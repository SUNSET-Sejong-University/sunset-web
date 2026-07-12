import { notFound } from "next/navigation";

import { PeopleSections } from "@/components/people/people-sections";
import { getSortedContributors } from "@/lib/content/contributors";
import { createSiteMetadata } from "@/lib/metadata/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/locales";

type PeoplePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PeoplePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  return createSiteMetadata(locale, {
    title: dictionary.peoplePage.title,
    description: dictionary.peoplePage.description,
    path: "people",
  });
}

export default async function PeoplePage({ params }: PeoplePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  const people = getSortedContributors();

  return <PeopleSections locale={locale} dictionary={dictionary} people={people} />;
}
