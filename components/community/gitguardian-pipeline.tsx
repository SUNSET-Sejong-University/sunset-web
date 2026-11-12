"use client";

import { m, useReducedMotion } from "motion/react";
import { useState } from "react";
import { gitguardianPipelineSource, gitguardianStages, visualCopy } from "@/lib/content/community-visuals";
import type { Locale } from "@/lib/i18n/locales";

export function GitguardianPipeline({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  return <figure className="gitguardian-pipeline">
    <figcaption><p className="mono">SPOONOS / STATEGRAPH</p><h3>{visualCopy.pipeline[locale]}</h3><p>{visualCopy.pipelineHint[locale]}</p></figcaption>
    <ol>{gitguardianStages.map((stage, index) => <li key={stage.id} data-active={active === index}>
      <button type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
        <svg viewBox="0 0 160 72" width="160" height="72" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M0 36h40 M120 36h40" /><rect x="40" y="12" width="80" height="48" rx="2" />
          <m.circle initial={false} cx="80" cy="36" r="8" animate={{ r: active === index ? 12 : 8 }} transition={{ duration: reducedMotion ? 0 : .18 }} />
          <path d="M64 4v8 M96 4v8 M64 60v8 M96 60v8" />
        </svg>
        <span className="mono">0{index + 1} / {stage.title[locale]}</span>
      </button>
      <p>{stage.description[locale]}</p>
    </li>)}</ol>
    <p className="pipeline-readout mono" aria-live="polite">{visualCopy.stage[locale]} 0{active + 1} · {gitguardianStages[active]?.id}</p>
    <a href={gitguardianPipelineSource} target="_blank" rel="noopener noreferrer" className="text-link">{visualCopy.codeSource[locale]} ↗</a>
  </figure>;
}
