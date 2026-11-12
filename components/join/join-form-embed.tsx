"use client";

import { useState } from "react";
import { joinApplication } from "@/lib/content/community";
import type { Locale } from "@/lib/i18n/locales";

export function JoinFormEmbed({ locale }: { locale: Locale }) {
  const [unavailable, setUnavailable] = useState(false);
  const copy = joinApplication.copy;
  return <section className="join-form-section" aria-labelledby="join-form-heading">
    <header className="join-form-heading"><div><p className="mono">SUNSET / APPLY</p><h2 id="join-form-heading">{copy.heading[locale]}</h2><p>{copy.context[locale]}</p></div>
      <a className="text-link" href={joinApplication.url} target="_blank" rel="noopener noreferrer">{copy.fallback[locale]} ↗</a>
    </header>
    <div className="join-form-frame">
      <div className="join-form-toolbar"><span className="mono">GOOGLE FORMS / SUNSET</span>
        <button type="button" onClick={() => setUnavailable((value) => !value)}>{unavailable ? copy.retry[locale] : copy.hide[locale]}</button>
      </div>
      {unavailable ? <div className="join-form-fallback" role="status"><h3>{copy.unavailableTitle[locale]}</h3><p>{copy.unavailable[locale]}</p>
        <a className="text-link" href={joinApplication.url} target="_blank" rel="noopener noreferrer">{copy.fallback[locale]} ↗</a>
      </div> : <iframe src={joinApplication.embedUrl} title={copy.title[locale]} width="100%" height="1850" referrerPolicy="strict-origin-when-cross-origin" onError={() => setUnavailable(true)} />}
    </div>
    <p className="join-form-note">{copy.note[locale]}</p>
  </section>;
}
