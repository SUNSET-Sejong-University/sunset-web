import Link from "next/link";

import { FeaturedProjectCard } from "@/components/home/featured-project-card";
import { getProjectBySlug } from "@/lib/content/projects";
import {
  homeFeaturedCards,
  homeStackChips,
} from "@/lib/content/home-featured";
import { GITHUB_ORG_URL } from "@/lib/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type HomeSectionsProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function ScopeReadout({ locale }: { locale: Locale }) {
  const foot =
    locale === "ko"
      ? [
          ["PEAK", "14 commits/day"],
          ["REPOS ACTIVE", "6"],
          ["UPTIME", "2024부터"],
        ]
      : [
          ["PEAK", "14 commits/day"],
          ["REPOS ACTIVE", "6"],
          ["UPTIME", "since 2024"],
        ];

  return (
    <section id="scope" className="scope-section">
      <div className="wrap">
        <div className="scope-panel reveal">
          <div className="scope-panel-head">
            <span className="eyebrow">
              <span className="dot" />
              LIVE READOUT — CH1
            </span>
            <span className="scope-readout mono">COMMIT ACTIVITY · LAST 90 DAYS</span>
          </div>
          <div className="scope-screen" aria-hidden>
            <svg viewBox="0 0 1080 220" preserveAspectRatio="none" className="scope-svg">
              <g className="scope-grid">
                {[55, 110, 165].map((y) => (
                  <line key={`h-${y}`} x1="0" y1={y} x2="1080" y2={y} />
                ))}
                {[135, 270, 405, 540, 675, 810, 945].map((x) => (
                  <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="220" />
                ))}
              </g>
              <line x1="0" y1="110" x2="1080" y2="110" className="scope-baseline" />
              <path
                className="scope-wave-ghost"
                d="M0,140 C40,138 60,150 90,120 C120,95 140,160 180,150 C220,140 240,90 280,80 C320,70 340,130 380,135 C420,140 450,160 480,145 C520,128 540,70 580,60 C620,52 650,110 690,118 C730,126 760,160 800,150 C840,142 870,95 910,85 C950,76 980,130 1020,128 C1050,127 1065,118 1080,120"
                fill="none"
              />
              <path
                className="scope-wave"
                d="M0,140 C40,138 60,150 90,120 C120,95 140,160 180,150 C220,140 240,90 280,80 C320,70 340,130 380,135 C420,140 450,160 480,145 C520,128 540,70 580,60 C620,52 650,110 690,118 C730,126 760,160 800,150 C840,142 870,95 910,85 C950,76 980,130 1020,128 C1050,127 1065,118 1080,120"
                fill="none"
              />
            </svg>
          </div>
          <p className="sr-only">
            Illustrative commit-activity waveform. Peak 14 commits per day, 6 active repositories,
            organization activity since 2024.
          </p>
          <div className="scope-panel-foot">
            {foot.map(([label, value]) => (
              <span key={label} className="mono">
                {label} <b>{value}</b>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeSections({ locale, dictionary }: HomeSectionsProps) {
  return (
    <>
      <ScopeReadout locale={locale} />

      <section id="mission">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                {dictionary.home.missionEyebrow}
              </span>
              <h2 style={{ whiteSpace: "pre-line" }}>{dictionary.home.missionTitle}</h2>
            </div>
            <p>{dictionary.home.missionBody}</p>
          </div>
          <div className="pillars reveal">
            {dictionary.home.pillars.map((pillar) => (
              <div key={pillar.refdes} className="component pillar">
                <span className="refdes mono">{pillar.refdes}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                {dictionary.home.featuredEyebrow}
              </span>
              <h2>{dictionary.home.featuredTitle}</h2>
            </div>
            <p>{dictionary.home.featuredBody}</p>
          </div>
          <div className="project-grid reveal">
            {homeFeaturedCards.map((card) => {
              const project = getProjectBySlug(card.slug);
              return (
                <FeaturedProjectCard
                  key={card.slug}
                  locale={locale}
                  card={card}
                  name={project?.name ?? card.slug}
                  summary={project?.summary[locale] ?? ""}
                  refCode={
                    project ? `P-${String(project.number).padStart(2, "0")}` : undefined
                  }
                />
              );
            })}
          </div>
          <div className="projects-more reveal">
            <a className="text-link" href={GITHUB_ORG_URL} target="_blank" rel="noopener noreferrer">
              {dictionary.home.allReposCta} <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                {dictionary.home.flowEyebrow}
              </span>
              <h2>{dictionary.home.flowTitle}</h2>
            </div>
            <p>{dictionary.home.flowBody}</p>
          </div>
          <div className="flow reveal">
            {dictionary.home.flowSteps.map((step) => (
              <div key={step.step} className="flow-step">
                <div className="marker mono">{step.step}</div>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stack">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                {dictionary.home.stackEyebrow}
              </span>
              <h2>{dictionary.home.stackTitle}</h2>
            </div>
          </div>
          <div className="stack-strip reveal">
            {homeStackChips.map((chip) => (
              <span key={chip} className="stack-chip mono">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="cta-band home-join">
        <div className="wrap">
          <div className="handoff-rail mono" aria-hidden>
            <span>HANDOFF — NEXT BUILD</span>
          </div>
          <div className="cta-inner home-join-inner reveal">
            <div className="home-join-copy">
              <h2>{dictionary.home.joinTitle}</h2>
              <p>{dictionary.home.joinBody}</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary" href={localizedPath(locale, "join")}>
                {dictionary.home.joinCta}
              </Link>
              <Link className="btn btn-ghost" href={localizedPath(locale, "projects")}>
                {dictionary.common.exploreProjects}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
