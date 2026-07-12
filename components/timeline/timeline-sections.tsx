import Link from "next/link";

import { getProjectBySlug } from "@/lib/content/projects";
import type { TimelineEvent } from "@/lib/content/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type TimelineSectionsProps = {
  locale: Locale;
  dictionary: Dictionary;
  events: readonly TimelineEvent[];
};

export function TimelineSections({ locale, dictionary, events }: TimelineSectionsProps) {
  return (
    <>
      <section className="timeline-hero">
        <div className="wrap">
          <span className="eyebrow">
            <span className="dot" />
            {dictionary.timelinePage.heroEyebrow}
          </span>
          <h1>{dictionary.timelinePage.title}</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: "52ch", color: "var(--solder-dim)" }}>
            {dictionary.timelinePage.description}
          </p>
          <p style={{ marginTop: 12, fontSize: 13, color: "var(--silk)", maxWidth: "52ch" }}>
            {dictionary.timelinePage.evidenceNote}
          </p>
        </div>
      </section>

      <div className="wrap page-section">
        <ol className="timeline-bus reveal" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {events.map((event, index) => (
            <li
              key={event.id}
              className={`timeline-event${index === 0 ? " timeline-event--active" : ""}`}
            >
              <div className="timeline-event-panel">
                <div className="timeline-event-meta">
                  <time dateTime={event.date}>{event.date}</time>
                  <span>{dictionary.timelinePage.eventTypes[event.type]}</span>
                  <span>LOG-{String(events.length - index).padStart(3, "0")}</span>
                </div>
                <h2>{event.title[locale]}</h2>
                <p>{event.description[locale]}</p>
                {event.projectSlug ? (
                  <Link
                    href={localizedPath(locale, `projects/${event.projectSlug}`)}
                    className="text-link"
                    style={{ marginTop: 12, display: "inline-block" }}
                  >
                    {getProjectBySlug(event.projectSlug)?.name ?? event.projectSlug} →
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
