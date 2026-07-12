"use client";

import { PcbTraceBoard } from "@/components/visual/PcbTraceBoard";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type AboutHeroProps = {
  dictionary: Dictionary;
};

export function AboutHero({ dictionary }: AboutHeroProps) {
  return (
    <section className="page-hero">
      <PcbTraceBoard
        seed={23}
        litCount={3}
        interactive
        className="page-hero-board"
        height={720}
      />
      <div className="wrap">
        <span className="eyebrow">
          <span className="dot" />
          {dictionary.aboutPage.heroEyebrow}
        </span>
        <h1>{dictionary.aboutPage.heroHeadline}</h1>
        <p className="lede">{dictionary.aboutPage.heroLede}</p>
      </div>
    </section>
  );
}
