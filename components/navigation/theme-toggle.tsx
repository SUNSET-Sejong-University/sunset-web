"use client";

import { useSyncExternalStore } from "react";

export const THEME_STORAGE_KEY = "sunset-theme";

type Theme = "dark" | "light";

type ThemeToggleProps = {
  labels: {
    toLight: string;
    toDark: string;
  };
};

function readCurrentTheme(): Theme {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/* The html[data-theme] attribute is the single source of truth; re-render
   whenever it (or the system preference) changes. */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

export function ThemeToggle({ labels }: ThemeToggleProps) {
  // Server snapshot is "dark" (brand default); the client snapshot takes over
  // after hydration without a mismatch.
  const theme = useSyncExternalStore(subscribeToTheme, readCurrentTheme, () => "dark" as Theme);
  const isLight = theme === "light";
  const label = isLight ? labels.toDark : labels.toLight;

  const toggleTheme = () => {
    const next: Theme = isLight ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage unavailable (private mode) — theme still applies for this page
    }
  };

  return (
    <button
      type="button"
      className="shell-control shell-control--icon theme-toggle"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      {isLight ? (
        /* moon — offer the night bench */
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
      ) : (
        /* sun — offer the daylight sheet */
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
