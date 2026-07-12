import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CaseStudyFooter,
  CinematicCaseStudy,
  EditorialCaseStudy,
  SystemsCaseStudy,
} from "@/components/projects/CaseStudyTemplates";
import { StatusBadge } from "@/components/ui/primitives";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getRelatedProjects,
} from "@/lib/content/projects";
import { createSiteMetadata, projectJsonLd } from "@/lib/metadata/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type ProjectPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.flatMap((slug) => [
    { lang: "en", slug },
    { lang: "ko", slug },
  ]);
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const locale = lang as Locale;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }
  return createSiteMetadata(locale, {
    title: project.name,
    description: project.summary[locale],
    path: `projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const related = getRelatedProjects(project.slug);

  const template =
    project.layout === "cinematic" ? (
      <CinematicCaseStudy
        project={project}
        locale={locale}
        dictionary={dictionary}
      />
    ) : project.layout === "systems" ? (
      <SystemsCaseStudy
        project={project}
        locale={locale}
        dictionary={dictionary}
      />
    ) : (
      <EditorialCaseStudy
        project={project}
        locale={locale}
        dictionary={dictionary}
      />
    );

  return (
    <article className="wrap page-section" style={{ paddingTop: 48 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projectJsonLd(locale, {
              name: project.name,
              summary: project.summary[locale],
              slug: project.slug,
              repositories: project.repositories,
            }),
          ),
        }}
      />
      <Link href={localizedPath(locale, "projects")} className="case-back">
        ← {dictionary.common.backToProjects}
      </Link>
      <header className="case-header">
        <span className="eyebrow">
          <span className="dot" />
          P-{String(project.number).padStart(2, "0")} · {dictionary.tier[project.tier]}
        </span>
        <h1>{project.name}</h1>
        <div className="spec-badge-row">
          <StatusBadge label={dictionary.tier[project.tier]} tone="accent" />
          <StatusBadge label={dictionary.status[project.status]} />
          {project.categories.map((category) => (
            <StatusBadge key={category} label={dictionary.category[category]} />
          ))}
        </div>
      </header>

      {template}

      <CaseStudyFooter
        project={project}
        locale={locale}
        dictionary={dictionary}
        related={related}
      />
    </article>
  );
}
