import { JoinFormEmbed } from "@/components/join/join-form-embed";
import { communityCopy, joinApplication } from "@/lib/content/community";
import { GITHUB_ORG_URL } from "@/lib/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

type JoinSectionsProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function JoinSections({ dictionary, locale }: JoinSectionsProps) {
  const sections = [
    { refdes: "U1", title: dictionary.joinPage.whoCanParticipateTitle, body: dictionary.joinPage.whoCanParticipate },
    { refdes: "U2", title: dictionary.joinPage.projectTypesTitle, body: dictionary.joinPage.projectTypes },
    {
      refdes: "U4",
      title: dictionary.joinPage.documentationExpectationsTitle,
      body: dictionary.joinPage.documentationExpectations,
    },
  ] as const;

  return (
    <>
      <section className="join-hero">
        <div className="wrap">
          <span className="eyebrow">
            <span className="dot" />
            {dictionary.joinPage.heroEyebrow}
          </span>
          <h1>{dictionary.joinPage.title}</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: "52ch", color: "var(--solder-dim)" }}>
            {dictionary.joinPage.description}
          </p>
        </div>
      </section>

      <div className="wrap page-section">
        <JoinFormEmbed locale={locale} />
        <details className="join-notes">
          <summary>{joinApplication.copy.notes[locale]}</summary>
        <div className="join-layout">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {sections.map((section) => (
              <section key={section.refdes} className="join-section reveal">
                <span className="refdes">{section.refdes}</span>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>

          <aside className="join-sidebar">
            <div className="join-section reveal">
              <span className="refdes">CHK-01</span>
              <h2>{dictionary.joinPage.checklistTitle}</h2>
              <ul className="join-checklist">
                {dictionary.joinPage.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="join-contact-panel reveal">
              <h2>{communityCopy.apply[locale]}</h2>
              <a className="text-link" href="#join-form-heading">{communityCopy.formAction[locale]} ↓</a>
              <a
                href={GITHUB_ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
                style={{ marginTop: 16, display: "inline-block" }}
              >
                {dictionary.joinPage.githubCta}
              </a>
            </div>
          </aside>
        </div>
        </details>
      </div>
    </>
  );
}
