import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

type SkipLinkProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SkipLink({ dictionary }: SkipLinkProps) {
  return (
    <a href="#main-content" className="skip-link">
      {dictionary.nav.skipToContent}
    </a>
  );
}
