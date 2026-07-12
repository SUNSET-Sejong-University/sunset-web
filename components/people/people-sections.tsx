import Link from "next/link";

import { getContributorInitials } from "@/lib/content/about-people";
import { getProjectBySlug } from "@/lib/content/projects";
import type { Contributor } from "@/lib/content/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type PeopleSectionsProps = {
  locale: Locale;
  dictionary: Dictionary;
  people: readonly Contributor[];
};

export function PeopleSections({ locale, dictionary, people }: PeopleSectionsProps) {
  return (
    <>
      <section className="people-hero">
        <div className="wrap">
          <span className="eyebrow">
            <span className="dot" />
            {dictionary.peoplePage.heroEyebrow}
          </span>
          <h1>{dictionary.peoplePage.title}</h1>
          <p className="lede people-hero-lede">{dictionary.peoplePage.description}</p>
          <p className="people-hero-note">{dictionary.peoplePage.incompleteNote}</p>
        </div>
      </section>

      <div className="wrap page-section">
        <ul className="people-grid-extended reveal">
          {people.map((person) => (
            <li key={person.id}>
              <article className="people-card-extended">
                <div className="people-card-head">
                  <div className="person-avatar">{getContributorInitials(person.displayName)}</div>
                  <div>
                    {person.githubUrl ? (
                      <a href={person.githubUrl} target="_blank" rel="noopener noreferrer">
                        <h2>{person.displayName}</h2>
                      </a>
                    ) : (
                      <h2>{person.displayName}</h2>
                    )}
                    <span className="role">{person.role[locale]}</span>
                  </div>
                </div>
                {person.projectSlugs.length > 0 ? (
                  <div className="people-card-projects">
                    {person.projectSlugs.map((slug) => {
                      const project = getProjectBySlug(slug);
                      if (!project) return null;
                      return (
                        <Link
                          key={slug}
                          href={localizedPath(locale, `projects/${slug}`)}
                          className="people-chip"
                        >
                          {project.name}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ul>

        <div className="people-footer-link">
          <p className="mono people-footer-label">{dictionary.peoplePage.projectsLabel}</p>
          <Link className="text-link" href={localizedPath(locale, "projects")}>
            {dictionary.nav.projects} →
          </Link>
        </div>
      </div>
    </>
  );
}
