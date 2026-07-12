import { notFound } from "next/navigation";

import { TimelineSections } from "@/components/timeline/timeline-sections";
import { getSortedTimelineEvents } from "@/lib/content/timeline";
import { createSiteMetadata } from "@/lib/metadata/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/locales";

type TimelinePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: TimelinePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  return createSiteMetadata(locale, {
    title: dictionary.timelinePage.title,
    description: dictionary.timelinePage.description,
    path: "timeline",
  });
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  const events = getSortedTimelineEvents();

  return <TimelineSections locale={locale} dictionary={dictionary} events={events} />;
}
