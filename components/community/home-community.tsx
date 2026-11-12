import Link from "next/link";
import { DisciplineGlyph } from "@/components/community/discipline-glyph";
import { buildSections } from "@/lib/content/community";
import { achievements, achievementMember } from "@/lib/content/achievements";
import { communityCopy } from "@/lib/content/community";
import { organizations, relationshipLabels } from "@/lib/content/partners";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

export function HomeCommunity({ locale }: { locale: Locale }) {
  return <section className="home-community"><div className="wrap">
    <div className="home-partners"><div><p className="mono pathway-focus">SUNSET / CONNECTIONS</p><h2>{communityCopy.partners.title[locale]}</h2>
      <Link className="text-link" href={localizedPath(locale, "partners")}>{communityCopy.meetPartners[locale]} →</Link></div>
      <ul>{organizations.map((organization) => <li key={organization.slug}><Link href={localizedPath(locale, `partners/${organization.slug}`)}><span>{organization.name}</span><small className="mono">{relationshipLabels[organization.status][locale]} ↗</small></Link></li>)}</ul>
    </div>
    {achievements.slice(0, 1).map((achievement) => <div className="home-achievement" key={achievement.id}>
      <p className="mono pathway-focus">{communityCopy.achievements.title[locale]} / {achievement.year}</p>
      <div><h2>{achievement.award[locale]}</h2><p>{achievement.project}</p><p>{achievementMember(achievement.memberId).displayName} · {achievement.event}</p></div>
      <Link className="text-link" href={localizedPath(locale, "achievements")}>{communityCopy.readAchievement[locale]} →</Link>
    </div>)}
    <div className="home-section-paths" aria-hidden="true">{buildSections.map((section) => <DisciplineGlyph key={section.slug} slug={section.slug} />)}</div>
    <div className="home-sections-link"><p>{communityCopy.sections.description[locale]}</p><Link className="text-link" href={localizedPath(locale, "sections")}>{communityCopy.sections.title[locale]} →</Link></div>
  </div></section>;
}
