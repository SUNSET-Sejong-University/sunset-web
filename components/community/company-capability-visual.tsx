import { companyCapabilities, visualCopy } from "@/lib/content/community-visuals";
import type { Organization } from "@/lib/content/partners";
import type { Locale } from "@/lib/i18n/locales";

export function CompanyCapabilityVisual({ kind, locale }: { kind: Organization["status"]; locale: Locale }) {
  return <figure className={`company-visual company-visual--${kind}`}>
    <svg viewBox="0 0 480 260" width="480" height="260" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {kind === "partner" ? <>
        <path className="capability-outline" d="m72 100 168-68 168 68-168 68Z M72 132l168 68 168-68 M72 164l168 68 168-68" />
        <path className="capability-trace" d="m135 100 56-22 49 20 49-20 56 22-56 23-49-20-49 20Z M240 168v64 M105 144v33 M375 144v33" />
        <path d="m211 100 29-12 29 12-29 12Z" /><circle cx="135" cy="100" r="4" /><circle cx="345" cy="100" r="4" />
        <path className="capability-guide" d="M40 56v154 M32 56h16 M32 210h16 M440 56v154 M432 56h16 M432 210h16" />
      </> : <>
        <path className="capability-trace" d="M114 66h66l32 44 M114 194h66l32-44 M274 130h60l30-64h50 M334 130l30 64h50" />
        <rect className="capability-outline" x="208" y="98" width="64" height="64" rx="3" /><circle cx="240" cy="130" r="16" />
        <rect x="64" y="38" width="48" height="56" rx="4" /><path d="M78 48h20 M82 84h12" />
        <rect x="64" y="168" width="48" height="48" /><path d="M74 180h28 M74 190h18 M74 200h24" />
        <path className="capability-outline" d="M364 66c-16 0-18-26 1-28 2-26 42-26 46 0 23-3 32 28 7 28Z" />
        <circle cx="390" cy="194" r="21" /><path d="M378 194h24 M390 182v24" />
        <circle cx="334" cy="130" r="4" /><circle cx="180" cy="66" r="4" /><circle cx="180" cy="194" r="4" />
      </>}
    </svg>
    <figcaption><span className="mono">{visualCopy.companyScope[locale]}</span><ul>{companyCapabilities[kind].map((label) => <li key={label.en}>{label[locale]}</li>)}</ul></figcaption>
  </figure>;
}
