import { notFound } from "next/navigation";
import { OrganizationPageContent } from "@/components/community/community-pages";
import { organizations } from "@/lib/content/partners";
import { isLocale, locales } from "@/lib/i18n/locales";
import { createSiteMetadata } from "@/lib/metadata/site";

type PageProps = { params: Promise<{ lang: string; slug: string }> };
export function generateStaticParams() {
  return locales.flatMap((lang) => organizations.map(({ slug }) => ({ lang, slug })));
}
export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;
  const organization = organizations.find((entry) => entry.slug === slug);
  if (!isLocale(lang) || !organization) return {};
  return createSiteMetadata(lang, { title: organization.name, description: organization.description[lang], path: `partners/${slug}` });
}
export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params;
  const organization = organizations.find((entry) => entry.slug === slug);
  if (!isLocale(lang) || !organization) notFound();
  return <OrganizationPageContent locale={lang} organization={organization} />;
}
