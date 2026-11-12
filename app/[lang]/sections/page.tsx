import { notFound } from "next/navigation";
import { SectionsPageContent } from "@/components/community/community-pages";
import { communityCopy } from "@/lib/content/community";
import { isLocale } from "@/lib/i18n/locales";
import { createSiteMetadata } from "@/lib/metadata/site";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const copy = communityCopy.sections;
  return createSiteMetadata(lang, { title: copy.title[lang], description: copy.description[lang], path: "sections" });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <SectionsPageContent locale={lang} />;
}
