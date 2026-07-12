import { notFound } from "next/navigation";

import { JoinSections } from "@/components/join/join-sections";
import { createSiteMetadata } from "@/lib/metadata/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/locales";

type JoinPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: JoinPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  return createSiteMetadata(locale, {
    title: dictionary.joinPage.title,
    description: dictionary.joinPage.description,
    path: "join",
  });
}

export default async function JoinPage({ params }: JoinPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return <JoinSections dictionary={dictionary} />;
}
