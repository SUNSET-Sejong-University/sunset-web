import Link from "next/link";

import {
  getGroupMembers,
  getOrgGroup,
  orgGroups,
  orgRelationships,
} from "@/lib/content/org-structure";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type OrgStructureSectionsProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function OrgStructureSections({ locale, dictionary }: OrgStructureSectionsProps) {
  const page = dictionary.orgStructurePage;
  const people = dictionary.peoplePage;
  const peoplePath = localizedPath(locale, "people");

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
          <p className="people-hero-note">{page.verifiedNote}</p>
        </div>
      </section>

      <div className="wrap page-section">
        <section className="org-structure-block reveal" aria-labelledby="org-groups-heading">
          <div className="people-section-head">
            <h2 id="org-groups-heading">{page.groupsTitle}</h2>
            <p>{page.groupsIntro}</p>
          </div>
          <ul className="org-structure-list">
            {orgGroups.map((group, index) => {
              const count = getGroupMembers(group.id).length;
              const countLabel =
                count === 0
                  ? people.noPublishedMembers
                  : count === 1
                    ? people.memberCountSingular
                    : people.memberCountPlural.replace("{count}", String(count));
              const title = group.title[locale];

              return (
                <li key={group.id} className="org-structure-item">
                  <article className="org-structure-card">
                    <span className="org-structure-ref mono" aria-hidden>
                      G{index + 1}
                    </span>
                    <h3>{title}</h3>
                    <p className="org-structure-purpose">{group.purpose[locale]}</p>
                    <p className="mono org-structure-count">{countLabel}</p>
                    <Link
                      className="text-link"
                      href={`${peoplePath}#${group.id}`}
                      aria-label={`${page.viewGroupLabel}: ${title}`}
                    >
                      {page.viewGroupLabel} →
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="org-structure-block reveal" aria-labelledby="org-relations-heading">
          <div className="people-section-head">
            <h2 id="org-relations-heading">{page.relationshipsTitle}</h2>
            <p>{page.relationshipsIntro}</p>
          </div>
          <ul className="org-relationship-list">
            {orgRelationships.map((relationship) => (
              <li key={relationship.id} className="org-relationship">
                <span className="people-chip">{getOrgGroup(relationship.groupId).title[locale]}</span>
                <p>{relationship.statement[locale]}</p>
              </li>
            ))}
          </ul>
          <p className="people-group-empty">{page.unpublishedNote}</p>
        </section>

        <div className="people-footer-link">
          <Link className="text-link" href={peoplePath}>
            ← {page.backToPeople}
          </Link>
        </div>
      </div>
    </>
  );
}
