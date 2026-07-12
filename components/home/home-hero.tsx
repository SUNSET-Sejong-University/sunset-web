"use client";

import Link from "next/link";

import { BootSequence } from "@/components/visual/BootSequence";
import { PcbTraceBoard } from "@/components/visual/PcbTraceBoard";
import { orgStats } from "@/lib/content/org";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type HomeHeroProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HomeHero({ locale, dictionary }: HomeHeroProps) {
  const bootLines = [
    "sunset@sejong:~$ whoami",
    "sunset@sejong:~$ status --org=SUNSET --repos=17 --state=ACTIVE",
  ] as const;

  return (
    <section className="hero">
      <PcbTraceBoard seed={7} interactive />
      <div className="hero-vignette" />
      <div className="hero-content wrap">
        <BootSequence lines={bootLines} />
        <h1>
          {dictionary.home.heroLead}{" "}
          <span className="accent">{dictionary.home.heroAccent}</span>
        </h1>
        <p className="hero-sub">{dictionary.home.heroDescription}</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href={localizedPath(locale, "join")}>
            {dictionary.home.joinCta}
          </Link>
          <a className="btn btn-ghost" href="#projects">
            {dictionary.home.heroProjectsLink}
          </a>
        </div>
      </div>
      <div className="hero-strip">
        {orgStats.map((stat) => (
          <div key={stat.id} className="cell">
            <b>{stat.value}</b>
            {stat.label[locale]}
          </div>
        ))}
      </div>
    </section>
  );
}
