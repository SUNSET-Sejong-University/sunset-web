"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import { SunsetMark, SunsetWordmark } from "@/components/brand/sunset-mark";
import { ProbePalette } from "@/components/navigation/probe-palette";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { GITHUB_ORG_URL } from "@/lib/content/site";
import { communityCopy, communityLinks } from "@/lib/content/community";
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
  const [communityOpen, setCommunityOpen] = useState(false);
  const communityToggle = useRef<HTMLButtonElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const communityMenu = useRef<HTMLLIElement>(null);
  const communityActive = ["people", ...communityLinks.map(({ path }) => path)]
    .some((path) => isActivePath(pathname, localizedPath(locale, path)));

  useEffect(() => {
    if (menuOpen) navigation.current?.querySelector("a")?.focus({ preventScroll: true });
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && !communityOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (communityOpen) {
          communityToggle.current?.focus();
          setCommunityOpen(false);
        } else {
          mobileToggle.current?.focus();
          setMenuOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, communityOpen]);

  useEffect(() => {
    if (!communityOpen) return;
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !communityMenu.current?.contains(event.target)) setCommunityOpen(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [communityOpen]);

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <Link href={localizedPath(locale)} className="brand" aria-label={`${dictionary.site.name} ${locale === "ko" ? "세종" : "SEJONG"}`}>
          <SunsetMark />
          <SunsetWordmark />
        </Link>

        <div className="site-header-cluster">
          <nav
            ref={navigation}
            className={`main-nav${menuOpen ? " is-open" : ""}`}
            aria-label={locale === "ko" ? "주 메뉴" : "Primary"}
            id="site-navigation"
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
                      aria-current={pathname === href || pathname === `${href}/` ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li className="community-menu-item" ref={communityMenu} onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setCommunityOpen(false);
              }}>
                <button ref={communityToggle} type="button" className={`community-menu-toggle${communityActive ? " is-active" : ""}`} aria-expanded={communityOpen} aria-controls="community-menu" onClick={() => setCommunityOpen((value) => !value)}>
                  {communityCopy.community[locale]} <ChevronDown size={15} aria-hidden />
                </button>
                <div id="community-menu" className="community-menu" hidden={!communityOpen}>
                  {[{ path: "people", label: dictionary.nav.people }, ...communityLinks.map(({ path, label }) => ({ path, label: label[locale] }))].map(({ path, label }) => {
                    const href = localizedPath(locale, path);
                    return <Link
                      key={path}
                      className={path === "people" ? "community-people-link" : undefined}
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      onClick={() => {
                        setCommunityOpen(false);
                        setMenuOpen(false);
                      }}
                    >{label}</Link>;
                  })}
                </div>
              </li>
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
              {locale === "ko" ? "GitHub에서 보기" : "View on GitHub"}
              <ArrowUpRight size={15} aria-hidden />
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
              ref={mobileToggle}
              type="button"
              className="shell-control shell-control--icon nav-toggle"
              aria-label={menuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
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
