import Link from "next/link";

import { SunsetChipMark } from "@/components/brand/SunsetChipMark";
import { WEBSITE_DEVELOPER } from "@/lib/content/developer";
import { ORG_CONTACT, ORG_FULL_NAME } from "@/lib/content/org";
import { GITHUB_ORG_URL } from "@/lib/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-readout mono" aria-hidden>
          <span className="footer-readout-dot" />
          <span>AFTER-HOURS · SEOUL · UTC+9</span>
          <span className="footer-readout-rail" />
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <SunsetChipMark />
              <span>
                {dictionary.site.name}
                <small>SEJONG UNIVERSITY</small>
              </span>
            </div>
            <p>{dictionary.footer.archive}</p>
            <p className="mono footer-meta">{ORG_FULL_NAME}</p>
          </div>
          <div className="footer-col">
            <h4 className="mono">Navigate</h4>
            <ul>
              {(
                [
                  ["", locale === "ko" ? "홈" : "Home"],
                  ["projects", dictionary.nav.projects],
                  ["people", dictionary.nav.people],
                  ["people/structure", dictionary.orgStructurePage.navLabel],
                  ["about", dictionary.nav.about],
                  ["join", dictionary.nav.join],
                ] as const
              ).map(([segment, label]) => (
                <li key={segment || "home"}>
                  <Link href={localizedPath(locale, segment || undefined)}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="mono">Contact</h4>
            <ul>
              <li>
                <a href={GITHUB_ORG_URL} target="_blank" rel="noopener noreferrer">
                  {dictionary.footer.github}
                </a>
              </li>
              <li>
                <a href={`mailto:${ORG_CONTACT.email}`}>{ORG_CONTACT.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="mono">{ORG_CONTACT.location[locale]}</p>
          <p>{dictionary.site.disclaimer}</p>
          <p className="footer-credit mono">
            {dictionary.footer.websiteBy}{" "}
            <a
              href={WEBSITE_DEVELOPER.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${WEBSITE_DEVELOPER.name} — portfolio`}
            >
              {WEBSITE_DEVELOPER.name}
            </a>
            <span aria-hidden> · </span>
            <a
              href={WEBSITE_DEVELOPER.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${WEBSITE_DEVELOPER.name} — GitHub`}
            >
              GitHub
            </a>
            <span aria-hidden> · </span>
            <a
              href={WEBSITE_DEVELOPER.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${WEBSITE_DEVELOPER.name} — LinkedIn`}
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
