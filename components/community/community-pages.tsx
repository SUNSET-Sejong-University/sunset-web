import Link from "next/link";
import type { ReactNode } from "react";
import { SectionPathwayMap } from "@/components/community/section-pathway-map";
import { DisciplineGlyph } from "@/components/community/discipline-glyph";
import { CompanyCapabilityVisual } from "@/components/community/company-capability-visual";
import { GitguardianPipeline } from "@/components/community/gitguardian-pipeline";
import { OrganizationMark } from "@/components/community/organization-mark";
import { PartnerShowcase } from "@/components/community/partner-showcase";
import { visualCopy } from "@/lib/content/community-visuals";

import { achievements, achievementCopy, achievementMember } from "@/lib/content/achievements";
import { buildSections, communityCopy } from "@/lib/content/community";
import { contributors } from "@/lib/content/contributors";
import { organizations, partnerCopy, relationshipLabels, type Organization } from "@/lib/content/partners";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

export function CommunityHero({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return <section className="community-hero"><div className="wrap">
    <span className="eyebrow"><span className="dot" />SUNSET / COMMUNITY</span>
    <h1>{title}</h1><p className="lede">{description}</p>{children}
  </div></section>;
}

export function SectionsPageContent({ locale }: { locale: Locale }) {
  return <>
    <CommunityHero title={communityCopy.sections.title[locale]} description={communityCopy.sections.description[locale]}>
      <p className="community-note">{communityCopy.sectionNote[locale]}</p>

    </CommunityHero>
    <div className="wrap page-section community-content section-pathways">
      <SectionPathwayMap locale={locale} />
      {buildSections.map((section, index) => {
        const member = section.memberId ? contributors.find((entry) => entry.id === section.memberId) : undefined;
        if (section.memberId && !member) throw new Error(`Unknown section member: ${section.memberId}`);
        return <section key={section.slug} id={section.slug} className="section-pathway">
          <div className="pathway-discipline"><span className="mono pathway-number" aria-hidden>0{index + 1}</span><DisciplineGlyph slug={section.slug} /></div>
          <div><p className="mono pathway-focus">{section.focus[locale]}</p><h2>{section.title[locale]}</h2></div>
          <div><p>{section.description[locale]}</p>
            {member || section.associatedName ? <p className="section-association">{communityCopy.associatedMember[locale]} · {member ? <Link href={`${localizedPath(locale, "people")}#person-${member.id}`}>{member.displayName}</Link> : section.associatedName}</p> : null}
            <Link className="text-link" href={localizedPath(locale, "join")}>{communityCopy.join[locale]} →</Link>
          </div>
        </section>;
      })}
      <p className="community-note">{communityCopy.sectionFormNote[locale]}</p>
    </div>
  </>;
}

export function PartnersPageContent({ locale }: { locale: Locale }) {
  return <>
    <CommunityHero title={communityCopy.partners.title[locale]} description={communityCopy.partners.description[locale]} />
    <div className="wrap page-section community-content organization-index">
      <PartnerShowcase locale={locale} />
      <h2 className="organization-directory-title">{visualCopy.directory[locale]}</h2>
      {organizations.map((organization) => <article className="organization-entry" key={organization.slug}>
        <Link href={localizedPath(locale, `partners/${organization.slug}`)} aria-label={`${organization.name} · ${partnerCopy.profile[locale]}`}><OrganizationMark organization={organization} /></Link>
        <div><p className="mono relationship-label">{relationshipLabels[organization.status][locale]}</p>
          <h2>{organization.name}</h2><p className="organization-field">{organization.field[locale]}</p><p>{organization.description[locale]}</p>
          <Link className="text-link" href={localizedPath(locale, `partners/${organization.slug}`)}>{partnerCopy.profile[locale]} →</Link>
        </div>
      </article>)}
      <p className="community-note">{partnerCopy.note[locale]}</p>
    </div>
  </>;
}

export function OrganizationPageContent({ locale, organization }: { locale: Locale; organization: Organization }) {
  return <>
    <CommunityHero title={organization.name} description={organization.field[locale]}>
      <Link className="text-link" href={localizedPath(locale, "partners")}>← {communityCopy.partners.title[locale]}</Link>
    </CommunityHero>
    <div className={`wrap page-section community-content organization-profile organization-profile--${organization.slug}`}>
      <aside><OrganizationMark organization={organization} />
        <CompanyCapabilityVisual kind={organization.status} locale={locale} /><p className="mono relationship-label">SUNSET · {relationshipLabels[organization.status][locale]}</p>
        <a className="text-link" href={organization.website} target="_blank" rel="noopener noreferrer">{partnerCopy.website[locale]} ↗</a>
      </aside>
      <div className="organization-story">
        <section><h2>{partnerCopy.company[locale]}</h2><p>{organization.description[locale]}</p></section>
        <section><h2>{partnerCopy.relationship[locale]}</h2><p className="relationship-statement">{organization.name} · {relationshipLabels[organization.status][locale]}</p><p>{partnerCopy.note[locale]}</p></section>
        <section><h2>{partnerCopy.sources[locale]}</h2><ul className="evidence-links">{organization.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul></section>
      </div>
    </div>
  </>;
}

export function AchievementsPageContent({ locale }: { locale: Locale }) {
  return <>
    <CommunityHero title={communityCopy.achievements.title[locale]} description={communityCopy.achievements.description[locale]} />
    <div className="wrap page-section community-content achievement-archive">
      {achievements.map((achievement) => {
        const member = achievementMember(achievement.memberId);
        return <article className="achievement-record" key={achievement.id}>
          <div className="achievement-year mono">{achievement.year}</div>
          <div className="achievement-body"><header><p className="mono relationship-label">{achievementCopy.member[locale]}</p>
            <h2 className="achievement-award">{achievement.award[locale]}</h2><p className="achievement-event">{achievement.event}</p><p className="mono">{achievement.date[locale]}</p>
          </header>
          <section className="achievement-project"><h3>{achievement.project}</h3>
            <Link className="achievement-person" href={`${localizedPath(locale, "people")}#person-${member.id}`}>{member.displayName} →</Link>
            <p>{achievement.description[locale]}</p><GitguardianPipeline locale={locale} /><a className="text-link" href={achievement.repository} target="_blank" rel="noopener noreferrer">{achievementCopy.project[locale]} ↗</a>
          </section>
          <section className="achievement-evidence"><h3>{achievementCopy.evidence[locale]}</h3><p>{achievementCopy.note[locale]}</p><ul className="evidence-links">{achievement.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label[locale]} ↗</a></li>)}</ul></section>
          </div>
        </article>;
      })}
    </div>
  </>;
}
