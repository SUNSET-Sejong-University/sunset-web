import { getDictionary } from "@/lib/i18n/dictionaries";
import { createSiteMetadata, organizationJsonLd } from "@/lib/metadata/site";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

import { HomeHero } from "@/components/home/home-hero";
import { HomeSections } from "@/components/home/home-sections";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  return createSiteMetadata(locale, {
    title: dictionary.site.name,
    description: dictionary.home.heroDescription,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(locale)),
        }}
      />
      <HomeHero locale={locale} dictionary={dictionary} />
      <HomeSections locale={locale} dictionary={dictionary} />
    </>
  );
}
