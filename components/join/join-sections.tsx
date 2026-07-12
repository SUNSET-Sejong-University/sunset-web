import { ORG_CONTACT } from "@/lib/content/org";
import { GITHUB_ORG_URL } from "@/lib/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type JoinSectionsProps = {
  dictionary: Dictionary;
};

export function JoinSections({ dictionary }: JoinSectionsProps) {
  const sections = [
    { refdes: "U1", title: dictionary.joinPage.whoCanParticipateTitle, body: dictionary.joinPage.whoCanParticipate },
    { refdes: "U2", title: dictionary.joinPage.projectTypesTitle, body: dictionary.joinPage.projectTypes },
    { refdes: "U3", title: dictionary.joinPage.proposalProcessTitle, body: dictionary.joinPage.proposalProcess },
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
              <p className="case-section-title">{dictionary.joinPage.contactTitle}</p>
              <a href={`mailto:${ORG_CONTACT.email}`}>{ORG_CONTACT.email}</a>
              <p style={{ marginTop: 12, fontSize: 12, color: "var(--silk)", lineHeight: 1.55 }}>
                {dictionary.joinPage.noFormNote}
              </p>
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
      </div>
    </>
  );
}
