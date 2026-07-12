import Link from "next/link";

import {
  aboutFeaturedContributorIds,
  getContributorInitials,
} from "@/lib/content/about-people";
import { contributors } from "@/lib/content/contributors";
import { orgStatsAbout, ORG_CONTACT_EMAIL } from "@/lib/content/org";
import { GITHUB_ORG_URL } from "@/lib/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type AboutSectionsProps = {
  locale: Locale;
  dictionary: Dictionary;
};

function ValueIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 4l-4 16M9 9H4M20 9h-5M9 15H4M20 15h-5" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h.01M9 15h.01M15 9l-6 6" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M11 11a4 4 0 100-8 4 4 0 000 8zM21 21v-2a4 4 0 00-3-3.87M17 3.13a4 4 0 010 7.75" />
      </svg>
    );
  }
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

export function AboutSections({ locale, dictionary }: AboutSectionsProps) {
  const about = dictionary.aboutPage;
  const featuredPeople = aboutFeaturedContributorIds
    .map((id) => contributors.find((person) => person.id === id))
    .filter((person): person is (typeof contributors)[number] => person !== undefined);

  return (
    <>
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="stat-strip reveal">
            {orgStatsAbout.map((stat) => (
              <div key={stat.id} className="stat">
                <div className="n mono">{stat.value}</div>
                <div className="l">{stat.label[locale]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story">
        <div className="wrap">
          <div className="split reverse">
            <div className="split-media reveal" aria-hidden>
              <div className="term-head">
                <span className="term-dot" />
                <span className="term-dot" />
                <span className="term-dot" />
              </div>
              {about.originTerminal.map((line, index) => {
                if (line.kind === "blank") {
                  return <div key={`term-${index}`} className="line">&nbsp;</div>;
                }
                if (line.kind === "comment") {
                  return (
                    <div key={`term-${index}`} className="line">
                      <span className="c">{line.text}</span>
                    </div>
                  );
                }
                if (line.kind === "command") {
                  return (
                    <div key={`term-${index}`} className="line">
                      <span className="c">$</span> <span className="k">{line.command}</span>{" "}
                      {line.args}
                    </div>
                  );
                }
                return (
                  <div key={`term-${index}`} className="line">
                    <span className="o">{line.hash}</span> <span className="s">{line.repo}:</span>{" "}
                    {line.message}
                  </div>
                );
              })}
            </div>
            <div className="reveal">
              <span className="kicker">{about.originKicker}</span>
              <h2>{about.originTitle}</h2>
              {about.originParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <p className="sr-only">{about.originTerminalSummary}</p>
        </div>
      </section>

      <section id="values">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                {about.valuesEyebrow}
              </span>
              <h2>{about.valuesTitle}</h2>
            </div>
            <p>{about.valuesIntro}</p>
          </div>
          <div className="values-grid reveal">
            {about.values.map((value, index) => (
              <div key={value.title} className="value-card">
                <ValueIcon index={index} />
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="people">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                {about.peopleEyebrow}
              </span>
              <h2>{about.peopleTitle}</h2>
            </div>
            <p>{about.peopleIntro}</p>
          </div>
          <div className="people-grid reveal">
            {featuredPeople.map((person) => {
              const card = (
                <>
                  <div className="person-avatar">{getContributorInitials(person.displayName)}</div>
                  <h4>{person.displayName}</h4>
                  <span className="role">{person.role[locale]}</span>
                </>
              );
              if (person.githubUrl) {
                return (
                  <a
                    key={person.id}
                    className="person-card"
                    href={person.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card}
                  </a>
                );
              }
              return (
                <div key={person.id} className="person-card">
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="join-cta" className="cta-band">
        <div className="wrap">
          <div className="handoff-rail mono" aria-hidden>
            <span>HANDOFF — NEXT BUILD</span>
          </div>
        </div>
        <div className="wrap cta-inner">
          <h2>{about.joinCtaTitle}</h2>
          <div className="cta-actions">
            <a className="btn btn-primary" href={`mailto:${ORG_CONTACT_EMAIL}`}>
              {about.joinCtaEmail}
            </a>
            <a
              className="btn btn-ghost"
              href={GITHUB_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {about.joinCtaRepos}
            </a>
          </div>
          <p className="sr-only">{dictionary.site.disclaimer}</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 48 }}>
        <p className="mono text-sm" style={{ color: "var(--silk)", maxWidth: "48rem" }}>
          {dictionary.site.disclaimer}
        </p>
        <p className="mt-4">
          <Link className="text-link" href={localizedPath(locale, "people")}>
            {dictionary.nav.people} →
          </Link>
        </p>
      </section>
    </>
  );
}
