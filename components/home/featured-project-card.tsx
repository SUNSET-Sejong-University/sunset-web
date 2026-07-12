"use client";

import Link from "next/link";
import { useState } from "react";

import type { HomeFeaturedCard } from "@/lib/content/home-featured";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type FeaturedProjectCardProps = {
  locale: Locale;
  card: HomeFeaturedCard;
  name: string;
  summary: string;
  refCode?: string | undefined;
};

export function FeaturedProjectCard({
  locale,
  card,
  name,
  summary,
  refCode,
}: FeaturedProjectCardProps) {
  const [open, setOpen] = useState(false);
  const detailId = `spec-${card.slug}`;

  return (
    <article className="project-card" data-card>
      {refCode ? <span className="pref mono">{refCode}</span> : null}
      <div className="row1">
        <Link href={localizedPath(locale, `projects/${card.slug}`)} className="pname">
          {name}
        </Link>
        <span className="pstat">
          <span className="lang-dot" style={{ background: card.langDot }} />
          {card.statusLine[locale]}
        </span>
      </div>
      <p className="pdesc">{summary}</p>
      <div className="ptags">
        {card.tags.map((tag) => (
          <span key={tag} className={`tag${tag.includes("Proposal") ? " concept" : ""}`}>
            {tag}
          </span>
        ))}
      </div>
      <div className={`card-detail${open ? " is-open" : ""}`} id={detailId} hidden={!open}>
        {card.specRows.map((row) => (
          <div key={row.label} className="card-detail-row">
            <span>{row.label}</span>
            <span>{row.value[locale]}</span>
          </div>
        ))}
      </div>
      <div className="pfoot">
        <span>{card.footLeft[locale]}</span>
        <span className="pfoot-actions">
          <button
            type="button"
            className={`detail-toggle mono${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls={detailId}
            onClick={() => setOpen((value) => !value)}
          >
            specs {open ? "−" : "+"}
          </button>
          <a href={card.repoUrl} target="_blank" rel="noopener noreferrer">
            Repo →
          </a>
        </span>
      </div>
    </article>
  );
}
