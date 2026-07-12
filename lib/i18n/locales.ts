export const locales = ["en", "ko"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "ko" : "en";
}

export function swapLocaleInPath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${locale}`;
  }
  if (isLocale(segments[0] ?? "")) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }
  return `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
