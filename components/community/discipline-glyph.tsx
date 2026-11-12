type DisciplineGlyphProps = { slug: string; className?: string };

/** Symbolic discipline cues, never a project screenshot or organization logo. */
export function DisciplineGlyph({ slug, className }: DisciplineGlyphProps) {
  return <svg viewBox="0 0 80 64" width="80" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
    {slug === "full-stack" ? <>
      <path d="m12 20 28-12 28 12-28 12Z M12 32l28 12 28-12 M12 44l28 12 28-12" />
      <path d="M40 32v24" strokeDasharray="3 4" />
    </> : slug === "app-development" ? <>
      <rect x="22" y="5" width="36" height="54" rx="5" /><path d="M32 12h16 M30 23h20v18H30z M36 51h8" />
      <path d="M12 23h10 M58 41h10" />
    </> : slug === "game-dev" ? <>
      <path d="M24 18h32l12 27c3 8-3 13-9 7l-9-8H30l-9 8c-6 6-12 1-9-7Z M25 26v14 M18 33h14" />
      <circle cx="52" cy="29" r="2" /><circle cx="59" cy="36" r="2" />
    </> : slug === "creative-arts" ? <>
      <path d="M10 49C14 4 40 4 40 32s26 28 30-17 M10 49h60 M18 12l44 40" />
      <circle cx="40" cy="32" r="5" /><rect x="14" y="8" width="8" height="8" /><rect x="58" y="48" width="8" height="8" />
    </> : slug === "embedded-systems" ? <>
      <rect x="24" y="16" width="32" height="32" /><path d="M32 6v10 M48 6v10 M32 48v10 M48 48v10 M12 24h12 M12 40h12 M56 24h12 M56 40h12 M32 24h16v16H32z" />
      <circle cx="12" cy="24" r="3" /><circle cx="68" cy="40" r="3" />
    </> : <>
      <circle cx="40" cy="32" r="10" /><ellipse cx="40" cy="32" rx="33" ry="17" transform="rotate(-28 40 32)" />
      <path d="M40 5v8 M40 51v8 M6 32h9 M65 32h9" /><circle cx="65" cy="16" r="3" />
    </>}
  </svg>;
}
