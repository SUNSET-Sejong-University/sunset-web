import { AboutHero } from "@/components/about/about-hero";
import { AboutSections } from "@/components/about/about-sections";
import { createSiteMetadata } from "@/lib/metadata/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  return createSiteMetadata(locale, {
    title: dictionary.aboutPage.title,
    description: dictionary.aboutPage.heroLede,
    path: "about",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <AboutHero dictionary={dictionary} />
      <AboutSections locale={locale} dictionary={dictionary} />
    </>
  );
}
