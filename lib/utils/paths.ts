import type { Locale } from "@/lib/i18n/locales";
import { getSiteUrl } from "@/lib/content/site";

export function localizedPath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildLanguageAlternates(pathAfterLocale = ""): Record<string, string> {
  const suffix = pathAfterLocale ? `/${pathAfterLocale.replace(/^\//, "")}` : "";
  return {
    en: absoluteUrl(`/en${suffix}`),
    ko: absoluteUrl(`/ko${suffix}`),
  };
}

export function isActivePath(currentPath: string, targetPath: string): boolean {
  if (targetPath === `/${currentPath.split("/")[1]}`) {
    return currentPath === targetPath || currentPath === `${targetPath}/`;
  }
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}

export function pathAfterLocale(pathname: string, locale: Locale): string {
  const prefix = `/${locale}`;
  if (pathname === prefix || pathname === `${prefix}/`) {
    return "";
  }
  if (pathname.startsWith(`${prefix}/`)) {
    return pathname.slice(prefix.length + 1);
  }
  return pathname.replace(/^\//, "");
}
