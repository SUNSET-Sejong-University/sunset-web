"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SunsetChipMark } from "@/components/brand/SunsetChipMark";
import { ProbePalette } from "@/components/navigation/probe-palette";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { GITHUB_ORG_URL } from "@/lib/content/site";
import type { ClientNavDictionary } from "@/lib/i18n/client-dictionary";
import {
  getAlternateLocale,
  swapLocaleInPath,
  type Locale,
} from "@/lib/i18n/locales";
import { isActivePath, localizedPath } from "@/lib/utils/paths";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: ClientNavDictionary;
};

const navItems = [
  ["", "home"],
  ["about", "about"],
  ["projects", "projects"],
  ["join", "join"],
] as const;

type SiteHeaderFrameProps = SiteHeaderProps & {
  pathname: string;
};

function SiteHeaderFrame({ locale, dictionary, pathname }: SiteHeaderFrameProps) {
  const alternateLocale = getAlternateLocale(locale);
  const alternateHref = swapLocaleInPath(pathname, alternateLocale);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <Link href={localizedPath(locale)} className="brand">
          <SunsetChipMark />
          <span>
            {dictionary.site.name}
            <small>SEJONG UNIVERSITY</small>
          </span>
        </Link>

        <div className="site-header-cluster">
          <nav
            className={`main-nav${menuOpen ? " is-open" : ""}`}
            aria-label="Primary"
          >
            <ul>
              {navItems.map(([segment, key]) => {
                const href = localizedPath(locale, segment || undefined);
                const active =
                  segment === ""
                    ? pathname === href || pathname === `${href}/`
                    : isActivePath(pathname, href);
                const label =
                  key === "home"
                    ? locale === "ko"
                      ? "홈"
                      : "Home"
                    : dictionary.nav[key as keyof typeof dictionary.nav];
                return (
                  <li key={segment || "home"}>
                    <Link
                      href={href}
                      className={active ? "is-active" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li className="mobile-only">
                <Link href={localizedPath(locale, "people")} onClick={() => setMenuOpen(false)}>
                  {dictionary.nav.people}
                </Link>
              </li>
              <li className="mobile-only">
                <Link href={localizedPath(locale, "timeline")} onClick={() => setMenuOpen(false)}>
                  {dictionary.nav.timeline}
                </Link>
              </li>
            </ul>
            <a
              className="shell-control shell-control--fill nav-cta"
              href={GITHUB_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <span className="arrow" aria-hidden>
                →
              </span>
            </a>
            <Link
              href={alternateHref}
              lang={alternateLocale}
              hrefLang={alternateLocale}
              className="shell-control mono lang-switch"
              aria-label={`${dictionary.nav.languageSwitch}: ${alternateLocale.toUpperCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {alternateLocale.toUpperCase()}
            </Link>
          </nav>

          <div className="header-end">
            <ProbePalette locale={locale} labels={dictionary.probe} />
            <ThemeToggle
              labels={{
                toLight: dictionary.nav.themeToLight,
                toDark: dictionary.nav.themeToDark,
              }}
            />
            <button
              type="button"
              className="shell-control shell-control--icon nav-toggle"
              aria-label={menuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const pathname = usePathname() ?? localizedPath(locale);
  return (
    <SiteHeaderFrame
      key={pathname}
      locale={locale}
      dictionary={dictionary}
      pathname={pathname}
    />
  );
}
