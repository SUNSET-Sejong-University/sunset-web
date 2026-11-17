import { JoinFormEmbed } from "@/components/join/join-form-embed";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

type JoinSectionsProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function JoinSections({ dictionary, locale }: JoinSectionsProps) {
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
      </div>
    </>
  );
}
