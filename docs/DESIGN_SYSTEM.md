# SUNSET Website Design System

## 1. Design concept

**Populated PCB / instrument readout.**

SUNSET’s visual identity treats the public site as a **schematic sheet under test**: copper traces on solder mask, phosphor live signals, silk-screen labels, and bench instrumentation. The metaphor is engineering hardware culture — not SaaS marketing, not decorative cyberpunk, not generic dark-mode documentation.

The site must feel like:

- a student workshop bench transitioning into a documented archive;
- one coherent instrument panel with route-specific compositions;
- evidence-first project storytelling with publication-quality diagrams;
- bilingual readability without sacrificing technical density.

It must **not** resemble:

- generic SaaS landing pages;
- glassmorphism or glowing gradient blobs;
- universal bento grids or interchangeable bordered cards;
- fake terminals, fake metrics, or stock imagery;
- the superseded After-Hours Signal Atlas (amber/indigo/teal wavelength palette).

Independent-status disclaimer remains visible where ambiguity could arise.

## 2. Signature mechanisms

### PcbTraceBoard

Deterministic procedural PCB hero backgrounds rendered in React (`components/visual/PcbTraceBoard.tsx`, model from `lib/visual/pcb-generator.ts`).

- Seeded layout: traces, vias, passive symbols (resistor, capacitor, IC outline), lit trace count.
- **Home hero:** seed `7`, interactive pointer proximity lighting (disabled under reduced motion or coarse pointer).
- **About / archive heroes:** alternate seeds and `litCount` for page-specific boards.
- Traces animate with copper/phosphor stroke states; no `innerHTML` SVG injection.

### Scope readout

Oscilloscope-style focal section on the homepage (`.scope-section`, `.scope-panel`, `.scope-readout`).

- Mono readout label (e.g. commit-activity channel).
- Void screen with grid, baseline, ghost wave, and animated phosphor trace (`stroke-dashoffset` reveal).
- Panel uses component-lead pseudo-elements at corners.

### Probe command palette

Global Cmd/Ctrl+K dialog (`components/navigation/probe-palette.tsx`).

- Filterable route, project, and repository commands from typed content.
- Copper active row, phosphor trigger dot, keyboard navigation (arrows, Enter, Escape).
- Localized labels via dictionary `probe` namespace.

### Component leads

Cards and panels expose **lead lines** — 1.5px horizontal stubs at opposing edges, via-colored at rest, copper on hover:

- `.component` — mission pillar cards (U1–U3 refdes labels).
- `.project-card` — featured and directory project cards.
- `.scope-panel` — scope readout frame.

Hover: `translateY(-2px)`, `--copper-dim` border, lead stubs energize to `--copper`.

### Shell control rail

All header actions (GitHub CTA, language switch, Probe trigger, theme toggle, mobile menu) share the `.shell-control` base class:

- 40px min-height, 14px inline padding, 6px radius, 1px via-bright border, `line-height: 1`, inline-flex centering.
- `--fill` variant (GitHub CTA): copper fill, `--copper-ink` text, arrow that shifts on hover without touching the border.
- `--icon` variant (theme toggle, menu button): 40×40 square.
- Shared copper `:focus-visible` ring; `.main-nav ul a` link styles are scoped so they never leak into controls.
- At ≤374px the Probe trigger collapses to its phosphor dot with a screen-reader label.

### Handoff rail

`.handoff-rail` — the SUNSET section divider used on CTA bands. A mono `HANDOFF — NEXT BUILD` label above a 1.5px rail whose gradient runs copper → phosphor (sunset warmth into night signal). Marks the page handing the visitor to the next build; not a generic border.

### Archive coordinates (P-##)

Projects carry `P-##` reference designators (`.pref`) in the archive index, and the same coordinates stamp homepage featured cards and case-study heroes, so one address identifies a project everywhere.

### After-hours bench readout

The footer opens with a phosphor signal dot and the mono mark `AFTER-HOURS · SEOUL · UTC+9` (`.footer-readout`), grounding the collective's real working context.

## 3. Color system

The site is a two-state instrument. Both states share the same semantic tokens
in `app/styles/sunset-theme.css`; only the values change.

- **Night bench (dark, default identity):** dark soldermask, copper traces,
  phosphor signals.
- **Daylight sheet (light):** cream soldermask / lab paper, copper ink, green
  signal states. Not a white SaaS theme.

```css
:root {
  color-scheme: dark;
  --void: #050607;
  --mask: #0d1411;
  --mask-raised: #131f1a;
  --mask-card: #121d18;
  --solder: #d4cdbe;
  --solder-dim: #a3aca4;
  --solder-faint: #959e96;
  --copper: #d97a4d;
  --copper-bright: #f0935f;
  --copper-dim: #8a4f33;
  --copper-ink: var(--void);   /* text on copper fills */
  --phosphor: #9fffa3;
  --phosphor-dim: #4f8a52;
  --via: #1c2520;
  --via-bright: #3d4f43;
  --silk: #a3aca4;
  --shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.45);
  --shadow-deep: 0 20px 60px rgba(0, 0, 0, 0.6);
}

html[data-theme="light"] {
  color-scheme: light;
  --void: #f4efe3;
  --mask: #ebe3d0;
  --mask-raised: #fdf8ec;
  --mask-card: #faf5e8;
  --solder: #23251f;
  --solder-dim: #494e45;
  --solder-faint: #5d6359;
  --copper: #a8481f;
  --copper-bright: #8c3a17;
  --copper-dim: #c98d68;
  --copper-ink: #fdf6ea;
  --phosphor: #1d7a33;
  --phosphor-dim: #3c7a4c;
  --via: #ddd4bf;
  --via-bright: #b3a88e;
  --silk: #575d51;
  --shadow-soft: 0 8px 24px rgba(35, 37, 31, 0.14);
  --shadow-deep: 0 20px 50px rgba(35, 37, 31, 0.22);
}
```

### Theming rules

- Explicit choice is stored in `localStorage("sunset-theme")` and applied
  before paint by an inline script in `app/layout.tsx`; without a stored
  choice, a `prefers-color-scheme: light` media block mirrors the light tokens
  for system/no-JS users.
- The header `ThemeToggle` (`components/navigation/theme-toggle.tsx`) treats
  `html[data-theme]` as the single source of truth via `useSyncExternalStore`.
- Never hard-code colors in components or CSS. Derive translucent veils and
  glows with `color-mix(in srgb, var(--token) N%, transparent)` so they adapt
  to both themes. Tailwind utilities map through `@theme inline` in
  `app/globals.css`.
- Light copper (`#a8481f`) is tuned for ≥4.5:1 text contrast on `--void`; do
  not lighten it for text use.

### Token roles

| Token | Role |
|---|---|
| `--void` | Page background, instrument screen, darkest layer |
| `--mask` | Secondary background, solder-mask field |
| `--mask-raised` | Hover/emphasis surface |
| `--mask-card` | Primary card and panel surface |
| `--solder` | Primary text |
| `--solder-dim` | Body and secondary copy |
| `--solder-faint` | Tertiary labels |
| `--copper` | Primary action, active nav, project signal, selection |
| `--copper-bright` | Hover/energized copper |
| `--copper-dim` | Subtle borders, inactive technical state |
| `--phosphor` | Live/active/oscilloscope state, implemented paths |
| `--phosphor-dim` | Secondary live state, ghost traces |
| `--via` / `--via-bright` | Trace grid, card borders, connector stubs |
| `--silk` | Diagram annotations, muted channel labels |

React diagrams also consume matching constants in `components/diagrams/diagram-shared.tsx` (`PCB` object).

### Accent use

- **Copper:** CTAs, focus rings, active Probe row, primary links, hover leads.
- **Phosphor:** Live indicators, scope wave, implemented diagram channels, status dots.
- **Via-bright:** Default card borders and grid lines.
- **Silk:** Incomplete or research channels in diagrams.

Do not reintroduce Signal Atlas amber/indigo/teal as primary accents.

## 4. Typography

Loaded via `next/font/google` in `app/layout.tsx`:

| Role | Family | CSS variable | Usage |
|---|---|---|---|
| Display | Space Grotesk | `--font-space-grotesk` | Headlines, section titles, pillar names |
| Body | Inter | `--font-inter` | Paragraphs, UI copy, descriptions |
| Utility | IBM Plex Mono | `--font-ibm-plex-mono` | Refdes, stats, metadata, Probe, scope readout |
| Korean | Noto Sans KR | `--font-noto-sans-kr` | Korean body and display fallback in stacks |

Stack definitions:

```css
--font-display: var(--font-space-grotesk), var(--font-noto-sans-kr), "Inter", sans-serif;
--font-body: var(--font-inter), var(--font-noto-sans-kr), system-ui, sans-serif;
--font-mono: var(--font-ibm-plex-mono), "JetBrains Mono", Menlo, Consolas, monospace;
```

### Hierarchy rules

- Display headlines: Space Grotesk 600–700, tight tracking, `clamp()` scale on hero.
- Body: Inter 400–500, 16px base, 1.6 line-height (1.75+ for Korean paragraphs).
- Mono labels: `.mono`, `.eyebrow` — uppercase Latin only; **never uppercase Korean**.
- Refdes pattern: `U1 — BUILD`, `SIG-GRIP` channel IDs beside sections and diagrams.
- Stat numerals: mono, tabular, oversized in attached metric strips.
- No monospace body paragraphs; no tiny gray text below `--solder-dim` contrast.

## 5. Layout and geometry

- **Max width:** `--max-width: 1180px`; horizontal padding `--gutter: clamp(20px, 5vw, 64px)`.
- **Low-radius geometry:** 2–4px on controls and cards; 50% only for dots and vias. Avoid `rounded-3xl`.
- **Depth:** layered mask surfaces, lead lines, copper border shifts, subtle translate on hover — not blur/glass.
- **Asymmetric editorial** layouts; variable flagship scale on homepage and projects index.
- **Sticky header:** 72px, chip mark (`SunsetChipMark`), nav, Probe trigger, language switch.

## 6. Case-study diagram grammar

Publication-quality PCB-style SVG diagrams in `components/diagrams/`. Shared primitives: `DiagramBackdrop`, `DiagramNode`, `DiagramZone`, `FlowConnector`, `LegendItem`.

### Channel kinds (`ChannelKind`)

| Kind | Stroke | Dash | Meaning |
|---|---|---|---|
| `implemented` | `--phosphor` | solid | Verified in repository |
| `experimental` | `--copper` | solid | Prototype or partial path |
| `incomplete` | `--silk` | `4 3` | Missing or unfinished module |
| `research` | `--silk` | `6 4` | Proposed or unverified |

### Flagship visual logic

| Project | Diagram emphasis |
|---|---|
| GRIP-5 | Webcam → landmarks → state → servos; host/transport/MCU zones |
| Tolqyn | Audio FFT + camera motion → generative field output |
| MoodFlix | Multimodal inputs → model stack → recommendation; dashed incomplete modules |
| NaeonAir/WisDrone | Airborne node → gateway → ground UI → dashed AI branch |

Supporting projects use `SupportingDiagrams.tsx` with channel-specific labels — not identical triple-box templates.

Label diagrams “System diagram” when generated; prefer real media when verified paths exist.

## 7. Motion and reveal

- **Motion for React:** `LazyMotion`, `domAnimation`, `MotionConfig reducedMotion="user"` via `components/motion/MotionProvider.tsx`.
- **RevealObserver:** IntersectionObserver on `.reveal` elements; instant visibility under `prefers-reduced-motion`.
- **Allowed:** scope wave draw, trace proximity lighting, staggered section reveal (opacity + small translate), filter transitions, mobile nav, boot sequence typing on hero.
- **Disallowed:** cursor followers, particles, scroll hijacking, excessive parallax, decorative-only animation.

Reduced motion: static board, instant reveals, no traveling scope stroke, no pointer trace lighting.

## 8. Brand assets

- **Chip mark:** `components/brand/SunsetChipMark.tsx` — IC outline, phosphor center via, copper stroke, pad leads.
- **Wordmark:** SUNSET mono in header; full name on About.
- **Favicon / theme:** `#050607` void via `app/icon.tsx` and layout metadata.

## 9. Page direction

| Route | Composition |
|---|---|
| **Home** | PcbTraceBoard hero, boot line, metric strip, scope readout, mission pillars, featured project cards, build flow, join band |
| **Projects** | Archive hero board, sticky filters, PCB-styled directory rows |
| **Case study** | Template-specific panels; flagship React diagrams |
| **People** | Contributor grid with copper role accents |
| **Timeline** | Chronological signal log with GitHub activity labels |
| **About** | Board hero (seed 23), stats, terminal origin block, values, people grid |
| **Join** | Checklist panels, confirmed contact path |

## 10. Responsive breakpoints

Required verification viewports: **320**, **390**, **768**, **1024**, **1440+**.

CSS breakpoints in `sunset-theme.css`:

- `max-width: 640px` — mobile stack, simplified grids
- `max-width: 980px` — tablet; pillar/project grids collapse
- `min-width: 720px` / `768px` / `980px` — progressive multi-column layouts

Mobile rules:

- Hero copy first; board simplified under reduced motion
- Diagrams recompose vertically; no horizontal scroll
- Touch targets ≥44px; filters remain native controls
- Probe trigger may compress; keyboard shortcut preserved

## 11. Korean typography

- Noto Sans KR in both display and body stacks after Latin primaries.
- Increased line-height (`1.75+`) on Korean body blocks.
- No uppercase Korean; no forced mono for Korean paragraphs.
- Language switch preserves path; localized fields in typed content records.
- Contributor roles may retain English project names where no verified Korean string exists.

## 12. Accessibility

Target WCAG 2.2 AA:

- Skip link, semantic landmarks, visible `:focus-visible` (copper outline)
- Probe: `role="dialog"`, `aria-modal`, listbox navigation
- Diagrams: `role="img"` with `AccessibleDiagramTitle` long descriptions
- Keyboard: filters, mobile nav, Probe arrows/Enter/Escape
- Reduced motion honored globally
- Sufficient contrast on solder text against mask surfaces

## 13. Prohibited patterns

Generic SaaS hero pill, bento grids, technology marquees, fake terminals as evidence, fake metrics, glassmorphism, Signal Atlas wavelength palette as primary identity, stock imagery, meaningless motion.

## 14. Visual self-review

Before declaring visual work complete, compare live routes against `docs/REDESIGN_AUDIT.md` and capture screenshots at required viewports including Probe open state.
