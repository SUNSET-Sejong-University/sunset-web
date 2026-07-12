# SUNSET

**Student-built systems after sunset**

Public bilingual engineering archive for [SUNSET](https://github.com/SUNSET-Sejong-University), an independent student engineering collective formed by students at Sejong University.

> SUNSET is an independent student-led collective. References to Sejong University describe the students' academic community and do not imply official university endorsement.

## Purpose

This website documents verified student software, hardware, and experimental projects. It prioritizes architecture, implementation evidence, limitations, and repository links over marketing language.

## Visual identity

Production UI uses a **PCB / instrument readout** design language:

- Two token-based themes: **night bench** (dark, default) and **daylight sheet** (light) — accessible header toggle, `prefers-color-scheme` fallback, persisted choice
- Copper-on-solder-mask palette (`--void`, `--mask`, `--copper`, `--phosphor`, and related tokens)
- Procedural `PcbTraceBoard` hero backgrounds
- Oscilloscope scope readout section
- Component-lead cards with refdes labels
- **Probe** command palette (Cmd/Ctrl+K) for routes and projects
- Space Grotesk, Inter, IBM Plex Mono, and Noto Sans KR typography

Canonical visual specification: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).

## Screenshots

Captured from the production build during verification (see `artifacts/screenshots/`):

| View | File |
|---|---|
| Homepage (1440×900) | `artifacts/screenshots/home-1440.png` |
| Homepage (768×1024) | `artifacts/screenshots/home-768.png` |
| Homepage (390×844) | `artifacts/screenshots/home-390.png` |
| Homepage (320×568) | `artifacts/screenshots/home-320.png` |
| Projects index | `artifacts/screenshots/projects-1440.png` |
| Filtered projects | `artifacts/screenshots/projects-filtered-1440.png` |
| Empty filter state | `artifacts/screenshots/projects-empty-1440.png` |
| Probe open dark/light (1440) | `artifacts/screenshots/probe-open-dark-1440.png`, `probe-open-light-1440.png` |
| Probe open (390) | `artifacts/screenshots/probe-open-390.png` |
| Header controls | `artifacts/screenshots/header-controls-dark-1440.png`, `header-controls-light-1440.png`, `header-controls-mobile-390.png` |
| Light mode | `artifacts/screenshots/light-home-1440.png`, `light-projects-1440.png`, `light-case-study-1440.png` |
| GRIP-5 case study | `artifacts/screenshots/grip-5-1440.png`, `grip-5-390.png` |
| Tolqyn case study | `artifacts/screenshots/tolqyn-1440.png` |
| MoodFlix case study | `artifacts/screenshots/moodflix-1440.png` |
| NaeonAir/WisDrone case study | `artifacts/screenshots/naeonair-wisdrone-1440.png` |
| About (errata removed) | `artifacts/screenshots/about-without-errata-1440.png` |
| Homepage CTA | `artifacts/screenshots/home-cta-dark-1440.png`, `home-cta-light-1440.png` |

## Main features

- Bilingual routes (`/en`, `/ko`) with path-preserving language switch
- Dark/light theming with an accessible header toggle and system-preference fallback
- PCB-styled homepage with procedural board hero, scope readout, and featured project cards
- Searchable and filterable projects directory (tier, status, category)
- Eleven curated public project case studies with limitations sections and PCB-style diagrams
- People, timeline, about, and join pages with factual constraints
- Global Probe command palette for navigation
- Metadata, sitemap, robots, manifest, and conservative JSON-LD
- Playwright functional tests and axe accessibility checks

## Architecture

- Next.js App Router with static generation
- Server Components by default; narrow client islands for navigation, filters, Probe, motion, and board interactivity
- Typed local content validated at build time
- Path-based localization with static dictionaries (no locale cookies)

## Technology stack

Resolved from `pnpm-lock.yaml` on 2026-06-26:

| Tool | Version |
|---|---:|
| Node.js | 22.18.0 |
| pnpm | 11.9.0 |
| Next.js | 16.2.9 |
| React | 19.2.4 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.3.1 |
| Motion | 12.41.0 |
| Lucide React | 0.511.0 |
| Playwright | 1.61.1 |
| @axe-core/playwright | 4.12.1 |

## Project structure

```text
app/                  Next.js routes, metadata, sitemap
app/styles/           PCB theme tokens (sunset-theme.css)
components/           Navigation, homepage, projects, diagrams, visual engine
lib/content/          Typed projects, contributors, timeline
lib/i18n/             Locales and dictionaries
lib/visual/           PcbTraceBoard generator
public/projects/      Local project media and system diagrams
tests/e2e/            Playwright and accessibility tests
docs/                 Product spec, audit, design system, reports
```

## Local installation

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` (redirects to `/en`).

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |
| `pnpm test:e2e` | Playwright tests (starts production server) |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical public site URL for metadata and sitemap. Falls back to `http://localhost:3000`. |

## Localization

- Supported locales: English (`en`), Korean (`ko`)
- Routes: `/[lang]/…`
- Project slugs are shared across locales; localized fields live inside typed content records
- Language switch preserves the current path

## Content workflow

1. Verify claims in `docs/REPOSITORY_AUDIT.md` against repository evidence.
2. Update typed content in `lib/content/projects/data.ts`.
3. Add or replace media under `public/projects/<slug>/` and record in `docs/ASSET_MANIFEST.md`.
4. Run `pnpm build` to trigger content validation (duplicate slugs, missing locales, missing media, excluded repositories).

Canonical specifications: [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md), [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md), [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).

## Testing

```bash
pnpm test:e2e
```

Tests cover routing, localization, navigation, filters, Probe palette (dark and light), header shell-control geometry, theme toggle persistence, homepage CTA integration, excluded repositories, metadata endpoints, console errors, and axe accessibility on representative pages in both themes.

Screenshot capture: `pnpm exec playwright test tests/e2e/screenshots.spec.ts`

## Accessibility

Target: WCAG 2.2 AA behavior. Includes skip link, semantic landmarks, keyboard navigation, visible focus, reduced-motion support, accessible filters/mobile menu, and Probe dialog semantics.

## Deployment

This project is ready for deployment on Vercel as a Next.js application (native Next.js detection; no custom `vercel.json` required).

Recommended production environment variable:

- `NEXT_PUBLIC_SITE_URL` — canonical production URL, for metadata and sitemap generation. Falls back to `http://localhost:3000` if unset.

Build command:

```bash
pnpm build
```

Local production preview:

```bash
pnpm build
pnpm start
```

## Contributing

1. Read [AGENTS.md](AGENTS.md) and the canonical docs under `docs/`.
2. Keep claims aligned with `docs/REPOSITORY_AUDIT.md`.
3. Do not invent project facts, roles, dates, metrics, or official university affiliation.
4. Run lint, typecheck, build, and e2e tests before proposing changes.

## Known limitations

- Most project pages use generated system diagrams rather than copied repository photos.
- Contributor records are incomplete; only GitHub-verified profiles are listed.
- Timeline dates reflect limited GitHub API sampling, labeled as GitHub activity.
- Lighthouse scores were not run in this verification session.
- Site is not deployed; production URL and CDN behavior are unverified.

## Independent status

> SUNSET is an independent student-led collective. References to Sejong University describe the students' academic community and do not imply official university endorsement.

Natural Korean equivalent appears on Korean routes and in the site footer.

## Credits

Website implementation by [Azizbek Arzikulov](https://portfolio-next-silk-two.vercel.app/).
