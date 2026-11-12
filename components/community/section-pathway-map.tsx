import { DisciplineGlyph } from "@/components/community/discipline-glyph";
import { buildSections } from "@/lib/content/community";
import { visualCopy } from "@/lib/content/community-visuals";
import type { Locale } from "@/lib/i18n/locales";

export function SectionPathwayMap({ locale }: { locale: Locale }) {
  return <figure className="pathway-map">
    <figcaption><span className="mono">SUNSET / 01—06</span><h2>{visualCopy.mapTitle[locale]}</h2><p>{visualCopy.mapHint[locale]}</p></figcaption>
    <nav className="pathway-map-board" aria-label={visualCopy.mapTitle[locale]}>
      <div className="pathway-map-origin" aria-hidden="true"><span className="mono">SUNSET</span><span className="map-origin-contact" /></div>
      <ol>{buildSections.map((section, index) => <li key={section.slug}>
        <a href={`#${section.slug}`}><DisciplineGlyph slug={section.slug} /><span><small className="mono">0{index + 1}</small><strong>{section.title[locale]}</strong></span><span className="map-port" aria-hidden="true" /></a>
      </li>)}</ol>
    </nav>
  </figure>;
}
