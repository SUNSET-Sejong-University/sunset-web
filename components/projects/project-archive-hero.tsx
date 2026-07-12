"use client";

import { PcbTraceBoard } from "@/components/visual/PcbTraceBoard";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ProjectArchiveHeroProps = {
  dictionary: Dictionary;
  projectCount: number;
};

export function ProjectArchiveHero({
  dictionary,
  projectCount,
}: ProjectArchiveHeroProps) {
  return (
    <section className="archive-hero">
      <PcbTraceBoard
        seed={31}
        litCount={5}
        interactive
        className="archive-hero-board"
        height={680}
      />
      <div className="wrap">
        <span className="eyebrow">
          <span className="dot" />
          {dictionary.projectsPage.heroEyebrow}
        </span>
        <h1>{dictionary.projectsPage.title}</h1>
        <p className="lede">{dictionary.projectsPage.description}</p>
        <div className="archive-readout mono" aria-label={dictionary.projectsPage.readoutLabel}>
          <span>
            <b>{String(projectCount).padStart(2, "0")}</b>
            {dictionary.projectsPage.readoutProjects}
          </span>
          <span>
            <b>04</b>
            {dictionary.projectsPage.readoutTiers}
          </span>
          <span>
            <b>CH-ARCHIVE</b>
            {dictionary.projectsPage.readoutChannel}
          </span>
        </div>
      </div>
    </section>
  );
}
