import { notFound } from "next/navigation";

import { ProjectArchiveHero } from "@/components/projects/project-archive-hero";
import { ProjectDirectory } from "@/components/projects/ProjectDirectory";
import { projects } from "@/lib/content/projects";
import { createSiteMetadata } from "@/lib/metadata/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pickProjectDirectoryDictionary } from "@/lib/i18n/client-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/locales";

type ProjectsPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  return createSiteMetadata(locale, {
    title: dictionary.projectsPage.title,
    description: dictionary.projectsPage.description,
    path: "projects",
  });
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <ProjectArchiveHero dictionary={dictionary} projectCount={projects.length} />
      <ProjectDirectory
        locale={locale}
        dictionary={pickProjectDirectoryDictionary(dictionary)}
        projects={projects}
      />
    </>
  );
}
