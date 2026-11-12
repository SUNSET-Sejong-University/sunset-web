"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { CompanyCapabilityVisual } from "@/components/community/company-capability-visual";
import { OrganizationMark } from "@/components/community/organization-mark";
import { visualCopy } from "@/lib/content/community-visuals";
import { organizations, partnerCopy, relationshipLabels } from "@/lib/content/partners";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

const subscribe = () => () => {};

export function PartnerShowcase({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const panelId = useId();
  const reducedMotion = useReducedMotion();
  const enhanced = useSyncExternalStore(subscribe, () => true, () => false);
  const organization = organizations[active];
  if (!organization) return null;

  function select(index: number) {
    const next = (index + organizations.length) % organizations.length;
    setDirection(next > active ? 1 : -1);
    setActive(next);
  }

  return <div className="partner-showcase" role="region" aria-roledescription="carousel" aria-label={visualCopy.showcase[locale]}
    onKeyDown={(event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); select(active + 1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); select(active - 1); }
      if (event.key === "Home") { event.preventDefault(); select(0); }
      if (event.key === "End") { event.preventDefault(); select(organizations.length - 1); }
    }}>
    <div className="brand-rail">
      <span className="mono brand-rail-label">SUNSET / CONNECTIONS</span>
      <div className="brand-rail-contacts">{organizations.map((entry, index) => <button type="button" key={entry.slug} disabled={!enhanced} aria-pressed={index === active} aria-controls={panelId} onClick={() => select(index)}>
        <span className="brand-contact" aria-hidden="true" /><span><strong>{entry.name}</strong><small>{relationshipLabels[entry.status][locale]}</small></span>
      </button>)}</div>
      <div className="brand-rail-controls">
        <button type="button" disabled={!enhanced} aria-label={visualCopy.previous[locale]} onClick={() => select(active - 1)}>←</button>
        <button type="button" disabled={!enhanced} aria-label={visualCopy.next[locale]} onClick={() => select(active + 1)}>→</button>
      </div>
    </div>
    <div id={panelId} className="brand-stage" onPointerDown={(event) => {
      if (event.pointerType === "touch") pointerStart.current = { x: event.clientX, y: event.clientY };
    }} onPointerCancel={() => { pointerStart.current = null; }} onPointerUp={(event) => {
      const start = pointerStart.current;
      pointerStart.current = null;
      if (!start) return;
      const horizontal = event.clientX - start.x;
      if (Math.abs(horizontal) > 50 && Math.abs(event.clientY - start.y) < 60) select(active + (horizontal < 0 ? 1 : -1));
    }}>
      <m.div key={organization.slug} className="brand-slide" role="group" aria-roledescription="slide" aria-label={`${organization.name} · ${relationshipLabels[organization.status][locale]}`}
        initial={!enhanced || reducedMotion ? false : { opacity: .7, x: direction * 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : .22 }}>
        <div className="brand-slide-identity"><p className="mono relationship-label">{relationshipLabels[organization.status][locale]}</p><OrganizationMark organization={organization} />
          <h2>{organization.name}</h2><p>{organization.field[locale]}</p>
          <Link className="text-link" href={localizedPath(locale, `partners/${organization.slug}`)}>{partnerCopy.profile[locale]} →</Link>
        </div>
        <CompanyCapabilityVisual kind={organization.status} locale={locale} />
      </m.div>
    </div>
    <p className="mono brand-current" role="status" aria-live="polite" aria-atomic="true">0{active + 1} / 0{organizations.length} · {organization.name} · {relationshipLabels[organization.status][locale]}</p>
  </div>;
}
