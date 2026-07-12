# SUNSET Codebase Conventions

Production naming and module boundaries for the SUNSET website. Reference-only material may use workflow names under `docs/design-reference/` and redesign audit docs; **production source must describe the SUNSET product**, not an AI model or migration process.

## Naming

| Kind | Convention | Example |
|------|------------|---------|
| React components & types | `PascalCase` | `HomeHero`, `PcbTraceBoard` |
| Functions, hooks, variables, exports | `camelCase` | `getProjectBySlug`, `useProbeCommands` |
| Hooks | `use` prefix | `useReducedMotion` |
| Source filenames | descriptive `kebab-case` | `home-hero.tsx`, `probe-palette.tsx` |
| Route segments | `kebab-case` | `/projects/grip-5` |
| CSS custom properties | semantic `kebab-case` | `--color-surface-raised` |
| Constants | descriptive; `UPPER_SNAKE` only for true globals | `GITHUB_ORG_URL` |
| Tests | behavior-oriented descriptions | `opens probe with Cmd+K` |

**Do not use** in production identifiers: `Claude`, `parity`, `conversion`, `migration`, `temp`, `new`, `old`, `v2`, `final`, or vague dump names (`utils`, `helpers`, `common`, `misc`).

Abbreviations are allowed only for established terms: PCB, SVG, SEO, URL, API.

## Directory responsibilities

```text
app/                 Next.js routes, root layout, global styles
app/styles/          Permanent SUNSET visual system (theme CSS)
components/
  brand/             Logos and marks
  navigation/        Header, footer, skip link, Probe palette
  home/              Homepage sections
  about/             About page sections
  projects/          Directory, filters, case-study templates
  people/            People page UI
  timeline/          Timeline UI
  join/              Join page UI
  visual/            PCB board, boot sequence, scroll reveals
  diagrams/          Flagship system diagrams
  motion/            Motion provider (client boundary)
lib/
  content/           Typed build-time content modules
  visual/            Deterministic PCB model generation
  i18n/              Locales and dictionaries
  metadata/          SEO and JSON-LD helpers
  validation/        Content validation
  utils/             Small path/locale helpers (named by concern)
```

Organize by **domain or feature**, never by workflow phase.

## Component boundaries

- **Server Components** are the default.
- Add `"use client"` only for: pointer/keyboard interaction, browser APIs, Motion, local UI state (expand/collapse, dialogs, filters).
- Do not put `"use client"` on root layouts, full pages, static case-study bodies, or footers.
- Keep one clear responsibility per module; extract when a file mixes content, DOM behavior, and rendering without reuse benefit.
- Avoid giant all-purpose files and one-line wrapper files.

## Content modules

- All public copy lives in typed modules under `lib/content/` and `lib/i18n/dictionaries.ts`.
- Content is validated at build time; no runtime CMS or GitHub fetch.
- Home featured cards: `lib/content/home-featured.ts` (six slugs for the hero grid; full archive remains in `projects/`).

## CSS organization

- **`app/globals.css`** — Tailwind `@theme` bridge and minimal utilities (e.g. `.sr-only`).
- **`app/styles/sunset-theme.css`** — Permanent PCB/schematic visual system: tokens, layout, components, motion, reduced-motion overrides.
- Split additional stylesheets only when each file has a distinct responsibility; preserve import order and token values when refactoring.

## Imports

- Use `@/` path alias for project imports.
- Prefer domain paths: `@/components/navigation/site-header`, `@/lib/content/home-featured`.
- Client components must not import modules that pull Node-only APIs (e.g. use `@/lib/content/projects/data` in client bundles, not `projects/index`).

## Client / server policy

| Concern | Location |
|---------|----------|
| PCB trace model | `lib/visual/pcb-generator.ts` (pure TS) |
| SVG rendering + pointer | `components/visual/pcb-trace-board.tsx` (client) |
| Typed page content | Server components + `lib/content/*` |
| Probe commands | Client; data from `projects/data.ts` |
| i18n | Static dictionaries; locale from route segment |

## Testing expectations

Before declaring work complete:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```

Tests describe user-visible behavior. Do not weaken TypeScript or add hidden test bypasses. Update selectors when accessibility labels change intentionally.

## Framework names (do not rename)

`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `icon.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, public route paths, project slugs, and external asset URLs.
