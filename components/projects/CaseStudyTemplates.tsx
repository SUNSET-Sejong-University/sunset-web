import Link from "next/link";

import type { Project } from "@/lib/content/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { StatusBadge } from "@/components/ui/primitives";

type CaseStudySectionProps = {
  title: string;
  children: React.ReactNode;
};

export function CaseStudySection({ title, children }: CaseStudySectionProps) {
  return (
    <section className="case-panel">
      <h2 className="case-section-title">{title}</h2>
      <div className="case-section-body">{children}</div>
    </section>
  );
}

export function CaseStudyList({ items }: { items: readonly string[] }) {
  return (
    <ul className="case-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

type CaseStudyProps = {
  project: Project;
  locale: Locale;
  dictionary: Dictionary;
};

export function SystemsCaseStudy({ project, locale, dictionary }: CaseStudyProps) {
  return (
    <div className="case-layout-systems">
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <CaseStudySection title={dictionary.caseStudy.summary}>
          <p>{project.summary[locale]}</p>
        </CaseStudySection>
        <CaseStudySection title={dictionary.caseStudy.problem}>
          <p>{project.problem[locale]}</p>
        </CaseStudySection>
        <CaseStudySection title={dictionary.caseStudy.implementation}>
          <CaseStudyList items={project.implementation[locale]} />
        </CaseStudySection>
        <CaseStudySection title={dictionary.caseStudy.architecture}>
          <CaseStudyList items={project.architecture[locale]} />
        </CaseStudySection>
        <CaseStudySection title={dictionary.caseStudy.decisions}>
          <CaseStudyList items={project.decisions[locale]} />
        </CaseStudySection>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <ProjectMedia project={project} locale={locale} dictionary={dictionary} priority />
        <div className="case-panel">
          <p className="case-section-title">{dictionary.caseStudy.status}</p>
          <div className="spec-badge-row">
            <StatusBadge label={dictionary.status[project.status]} tone="accent" />
            {project.labels.map((label) => (
              <StatusBadge key={label} label={dictionary.common[label]} />
            ))}
          </div>
          <div className="case-spec-stack">
            {project.technologies.map((tech) => (
              <div key={tech}>{tech}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CinematicCaseStudy({ project, locale, dictionary }: CaseStudyProps) {
  return (
    <div className="case-layout-cinematic">
      <ProjectMedia project={project} locale={locale} dictionary={dictionary} priority />
      <div style={{ display: "grid", gap: 24 }}>
        <CaseStudySection title={dictionary.caseStudy.summary}>
          <p>{project.summary[locale]}</p>
        </CaseStudySection>
        <CaseStudySection title={dictionary.caseStudy.problem}>
          <p>{project.problem[locale]}</p>
        </CaseStudySection>
      </div>
      <CaseStudySection title={dictionary.caseStudy.implementation}>
        <CaseStudyList items={project.implementation[locale]} />
      </CaseStudySection>
      <CaseStudySection title={dictionary.caseStudy.architecture}>
        <CaseStudyList items={project.architecture[locale]} />
      </CaseStudySection>
      <CaseStudySection title={dictionary.caseStudy.decisions}>
        <CaseStudyList items={project.decisions[locale]} />
      </CaseStudySection>
    </div>
  );
}

export function EditorialCaseStudy({ project, locale, dictionary }: CaseStudyProps) {
  return (
    <div className="case-layout-editorial">
      <div className="case-layout-editorial-top">
        <ProjectMedia project={project} locale={locale} dictionary={dictionary} priority />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <CaseStudySection title={dictionary.caseStudy.summary}>
            <p style={{ fontSize: "1.05rem", color: "var(--solder)" }}>
              {project.summary[locale]}
            </p>
          </CaseStudySection>
          <CaseStudySection title={dictionary.caseStudy.problem}>
            <p>{project.problem[locale]}</p>
          </CaseStudySection>
        </div>
      </div>
      <div className="case-layout-editorial-bottom">
        <CaseStudySection title={dictionary.caseStudy.implementation}>
          <CaseStudyList items={project.implementation[locale]} />
        </CaseStudySection>
        <CaseStudySection title={dictionary.caseStudy.decisions}>
          <CaseStudyList items={project.decisions[locale]} />
        </CaseStudySection>
      </div>
      <CaseStudySection title={dictionary.caseStudy.architecture}>
        <CaseStudyList items={project.architecture[locale]} />
      </CaseStudySection>
    </div>
  );
}

export function CaseStudyFooter({
  project,
  locale,
  dictionary,
  related,
}: CaseStudyProps & { related: Project[] }) {
  return (
    <div className="case-footer">
      <CaseStudySection title={dictionary.common.limitations}>
        <CaseStudyList items={project.limitations[locale]} />
      </CaseStudySection>

      <CaseStudySection title={dictionary.common.repositories}>
        <ul className="case-list" style={{ listStyle: "none", padding: 0 }}>
          {project.repositories.map((repo) => (
            <li key={repo.url}>
              <a
                href={repo.url}
                className="mono"
                style={{ color: "var(--copper)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </CaseStudySection>

      {related.length > 0 ? (
        <CaseStudySection title={dictionary.common.relatedProjects}>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: 12, listStyle: "none", margin: 0, padding: 0 }}>
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={localizedPath(locale, `projects/${item.slug}`)}
                  className="case-related-link"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      ) : null}
    </div>
  );
}
