import Link from "next/link";

import { getContributorInitials } from "@/lib/content/about-people";
import { getGroupMembers, orgGroups } from "@/lib/content/org-structure";
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

type PersonCardProps = {
  locale: Locale;
  person: Contributor;
  /** Heading level for the person's name; depends on the surrounding section. */
  headingLevel: "h3" | "h4";
};

function PersonCard({ locale, person, headingLevel: Heading }: PersonCardProps) {
  return (
    <article className="people-card-extended">
      <div className="people-card-head">
        <div className="person-avatar">{getContributorInitials(person.displayName)}</div>
        <div>
          {person.githubUrl ? (
            <a href={person.githubUrl} target="_blank" rel="noopener noreferrer">
              <Heading>{person.displayName}</Heading>
            </a>
          ) : (
            <Heading>{person.displayName}</Heading>
          )}
          <span className="role">{person.role[locale]}</span>
        </div>
      </div>
      {person.projectSlugs.length > 0 || person.linkedinUrl ? (
        <div className="people-card-projects">
          {person.linkedinUrl ? (
            <a
              href={person.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="people-chip"
              aria-label={`${person.displayName} — LinkedIn`}
            >
              LinkedIn ↗
            </a>
          ) : null}
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
  );
}

export function PeopleSections({ locale, dictionary, people }: PeopleSectionsProps) {
  const page = dictionary.peoplePage;
  const structurePath = localizedPath(locale, "people/structure");

  return (
    <>
      <section className="people-hero">
        <div className="wrap">
          <span className="eyebrow">
            <span className="dot" />
            {page.heroEyebrow}
          </span>
          <h1>{page.title}</h1>
          <p className="lede people-hero-lede">{page.description}</p>
          <p className="people-hero-note">{page.incompleteNote}</p>
          <nav className="people-group-nav" aria-label={page.groupsNavLabel}>
            <ul>
              {orgGroups.map((group) => (
                <li key={group.id}>
                  <a href={`#${group.id}`} className="people-chip people-group-nav-link">
                    {group.title[locale]}
                  </a>
                </li>
              ))}
              <li>
                <Link href={structurePath} className="people-chip people-group-nav-link">
                  {page.structureLinkLabel} →
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <div className="wrap page-section">
        <div className="people-section-head reveal">
          <h2>{page.groupsTitle}</h2>
          <p>{page.groupsIntro}</p>
        </div>

        {orgGroups.map((group) => {
          const members = getGroupMembers(group.id);
          const headingId = `${group.id}-heading`;
          const countLabel =
            members.length === 0
              ? null
              : members.length === 1
                ? page.memberCountSingular
                : page.memberCountPlural.replace("{count}", String(members.length));

          return (
            <section
              key={group.id}
              id={group.id}
              className="people-group reveal"
              aria-labelledby={headingId}
            >
              <header className="people-group-head">
                <h3 id={headingId}>{group.title[locale]}</h3>
                {countLabel ? <span className="mono people-group-count">{countLabel}</span> : null}
              </header>
              <p className="people-group-purpose">{group.purpose[locale]}</p>
              {members.length > 0 ? (
                <ul className="people-grid-extended">
                  {members.map((person) => (
                    <li key={person.id}>
                      <PersonCard locale={locale} person={person} headingLevel="h4" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="people-group-empty">{page.noPublishedMembers}</p>
              )}
            </section>
          );
        })}

        <div className="people-structure-link reveal">
          <div>
            <h2 className="people-structure-link-title">{page.structureLinkLabel}</h2>
            <p>{page.structureLinkHint}</p>
          </div>
          <Link className="text-link" href={structurePath}>
            {page.structureLinkLabel} →
          </Link>
        </div>

        <div className="people-section-head reveal">
          <h2>{page.contributorsTitle}</h2>
          <p>{page.contributorsIntro}</p>
        </div>

        <ul className="people-grid-extended reveal">
          {people.map((person) => (
            <li key={person.id}>
              <PersonCard locale={locale} person={person} headingLevel="h3" />
            </li>
          ))}
        </ul>

        <div className="people-footer-link">
          <p className="mono people-footer-label">{page.projectsLabel}</p>
          <Link className="text-link" href={localizedPath(locale, "projects")}>
            {dictionary.nav.projects} →
          </Link>
        </div>
      </div>
    </>
  );
}
