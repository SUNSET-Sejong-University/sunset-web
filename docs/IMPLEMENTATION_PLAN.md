# SUNSET Website Implementation Plan

## 1. Operating model

Execute phases in order.

At the start of each phase:

1. reread `AGENTS.md`;
2. read this phase;
3. read the relevant canonical specification;
4. update `docs/IMPLEMENTATION_STATUS.md` with the active phase.

At the end of each phase:

1. run the phase checks;
2. fix failures;
3. verify exit criteria;
4. update `docs/IMPLEMENTATION_STATUS.md`;
5. do not continue with hidden failures.

## 2. Phase overview

- Phase 0 — Workspace and repository audit
- Phase 1 — Foundation and architecture
- Phase 2 — Typed content and localization
- Phase 3 — Design system and global layout
- Phase 4 — Homepage
- Phase 5 — Projects directory
- Phase 6 — Project case studies
- Phase 7 — People, timeline, about, and join
- Phase 8 — Metadata, structured data, and security
- Phase 9 — Functional and accessibility tests
- Phase 10 — Production browser QA and visual correction
- Phase 11 — Final verification and handoff

---

## Phase 0 — Workspace and repository audit

### Objectives

- inspect the current repository;
- confirm whether implementation already exists;
- inspect the SUNSET GitHub organization;
- verify or update the repository audit;
- identify reusable real media;
- identify missing facts;
- identify sensitive material without copying values.

### Required work

- inventory current files and lockfiles;
- determine package manager;
- inspect existing Git history only when useful;
- verify the 17 known public repositories;
- compare code with `docs/REPOSITORY_AUDIT.md`;
- update repository status and evidence paths;
- create a media-source manifest;
- record unknown contributor roles and dates;
- record excluded repositories;
- record repositories combined into public projects.

### Deliverables

- corrected `docs/REPOSITORY_AUDIT.md`;
- initial asset manifest;
- updated `docs/IMPLEMENTATION_STATUS.md`;
- no implementation changes unless required to preserve existing work.

### Exit criteria

- every repository has a public treatment;
- no public project claim lacks a source category;
- missing facts are explicitly marked unknown;
- secrets are not copied into project files;
- the active project list is fixed.

---

## Phase 1 — Foundation and architecture

### Objectives

Create or normalize the production application foundation.

### Required work

- establish Next.js 16 App Router;
- use React 19 and TypeScript;
- configure Tailwind CSS v4;
- configure ESLint flat config;
- configure strict TypeScript;
- configure `pnpm`;
- install only approved dependencies;
- create route structure;
- establish Server Component default;
- create minimal Motion provider;
- establish design tokens;
- configure optional `NEXT_PUBLIC_SITE_URL`;
- add scripts for lint, typecheck, build, and tests.

### TypeScript requirements

Enable:

- `strict`;
- `noUncheckedIndexedAccess`;
- `noImplicitOverride`;
- `noFallthroughCasesInSwitch`;
- `exactOptionalPropertyTypes` when compatible.

Do not weaken strictness to silence implementation errors.

### Exit criteria

- clean install succeeds;
- `pnpm lint` passes;
- `pnpm typecheck` passes;
- empty production route structure builds;
- no unapproved dependency exists;
- client boundaries remain narrow.

---

## Phase 2 — Typed content and localization

### Objectives

Build the static content architecture before visual page implementation.

### Required work

- create shared locale types;
- create dictionary loading;
- create typed project model;
- create project collection;
- create contributor model;
- create timeline model;
- create build-time assertions;
- create `generateStaticParams()`;
- implement path-preserving language utilities;
- define public/excluded project lists;
- create local content from verified audit only.

### Required validation

Fail build for:

- duplicate slug;
- missing locale field;
- missing repository;
- empty limitations;
- invalid media path;
- unsupported category;
- excluded repository in public output;
- invalid locale.

### Exit criteria

- English and Korean route generation works;
- content compiles with strict types;
- project collection matches audit;
- drone repositories are consolidated;
- learning repositories are grouped;
- excluded repositories have no public route.

---

## Phase 3 — Design system and global layout

### Objectives

Create the global visual language and navigation without generic template patterns.

### Required work

- load Geist/Noto Sans KR/Geist Mono;
- implement global tokens;
- implement skip link;
- implement desktop navigation;
- implement accessible mobile navigation;
- implement language switch;
- implement footer and disclaimer;
- implement page container and typography primitives only where useful;
- implement reduced-motion provider;
- verify focus states and contrast;
- verify 320 px behavior.

### Exit criteria

- navigation works with keyboard;
- mobile menu closes on Escape and route change;
- language switch preserves path;
- footer disclaimer is present;
- no generic UI library added;
- global layout passes accessibility smoke test;
- no horizontal overflow at required widths.

---

## Phase 4 — Homepage

### Objectives

Implement a distinctive editorial homepage.

### Required work

- after-class hero;
- maximum two primary actions;
- featured editorial project sequence;
- discipline/working-mode section;
- project lifecycle section;
- verified activity excerpt;
- join invitation;
- responsive composition;
- purposeful limited motion.

### Visual constraints

- no generic SaaS hero;
- no bento-grid homepage;
- no fake metrics;
- no stock imagery;
- no technology marquee;
- no decorative terminal.

### Exit criteria

- visitor understands identity within five seconds;
- all flagship projects receive distinct treatment;
- real media or verified diagrams dominate;
- homepage works without JavaScript except intentional interactions;
- screenshots at 1440, 768, 390, and 320 widths have been reviewed.

---

## Phase 5 — Projects directory

### Objectives

Create an accessible editorial project index.

### Required work

- server-render initial project data;
- narrow client filter island;
- localized search;
- tier filter;
- status filter;
- category filter;
- combined filters;
- result count;
- clear filters;
- empty state;
- role-based accessible controls;
- no public excluded repository.

### Exit criteria

- all filter combinations behave correctly;
- keyboard flow is clear;
- search covers required fields;
- no dependency added for search;
- filtered and empty states have screenshots;
- 320 px layout remains usable.

---

## Phase 6 — Project case studies

### Objectives

Implement every curated public project with appropriate template family.

### Required project pages

- GRIP-5
- Tolqyn
- MoodFlix
- NaeonAir/WisDrone
- Intellichair
- BuildIn
- IKUMPlay
- roastivator
- DSNSim
- aura
- grouped learning archive

### Required work

- systems template;
- cinematic template;
- editorial/research template;
- real media integration;
- verified SVG diagrams when media is absent;
- implementation/proposed/incomplete labels;
- limitations section;
- repository links;
- related-project logic;
- project-specific metadata.

### Exit criteria

- every page contains required case-study sections;
- no project overclaims implementation;
- no project uses placeholder media;
- four flagship pages are visually distinct;
- mobile layouts are reviewed;
- all pages build statically.

---

## Phase 7 — People, timeline, about, and join

### People

- use verified profiles only;
- neutral sorting;
- no contribution rankings;
- no inferred roles.

### Timeline

- label repository-derived dates as GitHub activity;
- explain evidence limitations;
- avoid fake founding dates.

### About

- explain independent status;
- explain archive purpose;
- do not invent origin story.

### Join

- no fake form;
- provide proposal and documentation checklist;
- no invented communication channel.

### Exit criteria

- all routes contain real content;
- no empty pages;
- no unsupported names or roles;
- no false chronology;
- no fake contact path.

---

## Phase 8 — Metadata, structured data, and security

### Objectives

Complete production discoverability and static security.

### Required work

- localized title template;
- descriptions;
- canonical URLs;
- language alternates;
- Open Graph;
- Twitter cards;
- project metadata;
- project OG images where useful;
- `robots.ts`;
- `sitemap.ts`;
- `manifest.ts`;
- JSON-LD;
- icons;
- security headers;
- `poweredByHeader: false`;
- secret-pattern audit.

### Exit criteria

- sitemap contains both locales and all public projects;
- excluded repositories are absent;
- metadata does not overclaim;
- structured data uses conservative schema;
- site builds without `NEXT_PUBLIC_SITE_URL`;
- no secret or private-address pattern appears in public output.

---

## Phase 9 — Functional and accessibility tests

### Objectives

Create and pass production-oriented automated verification.

### Required functional tests

- root redirect;
- English/Korean home;
- all main routes;
- all project routes;
- unsupported locale;
- unknown project;
- sitemap;
- robots;
- desktop navigation;
- mobile menu;
- Escape behavior;
- language path preservation;
- project filters;
- search;
- result count;
- empty state;
- excluded-repository absence;
- combined drone page;
- content invariants;
- console and asset errors.

### Required accessibility tests

Use `@axe-core/playwright` on:

- English home;
- Korean home;
- projects directory;
- GRIP-5;
- Tolqyn;
- MoodFlix;
- NaeonAir/WisDrone;
- open mobile navigation.

Fix all serious and critical violations.

### Exit criteria

- `pnpm lint` passes;
- `pnpm typecheck` passes;
- `pnpm build` passes;
- `pnpm test:e2e` passes;
- no serious/critical axe issue remains;
- failure evidence is not hidden.

---

## Phase 10 — Production browser QA and visual correction

### Objectives

Inspect the production build visually and correct design drift.

### Required environment

- production build;
- production server;
- Cursor browser or equivalent real browser;
- no reliance on dev-only behavior.

### Required screenshots

Homepage:

- 1440 × 900
- 768 × 1024
- 390 × 844
- 320 × 568

Projects:

- 1440 × 900
- 390 × 844
- filtered state
- empty state

Case studies:

- GRIP-5 desktop/mobile
- Tolqyn desktop/mobile
- MoodFlix desktop
- NaeonAir/WisDrone desktop/mobile

Save under:

`artifacts/screenshots/`

### Required checks

- no horizontal overflow;
- no clipped headings;
- no generic AI/SaaS composition;
- no overused cards or radius;
- readable Korean;
- visible limitations;
- meaningful status;
- real evidence dominant;
- mobile intentionally composed;
- reduced-motion behavior;
- keyboard focus order;
- console clean;
- assets load.

### Exit criteria

- screenshots reviewed and corrected;
- no known major visual defect remains;
- all relevant tests rerun after correction;
- screenshot paths recorded.

---

## Phase 11 — Final verification and handoff

### Objectives

Produce a truthful, reproducible final state.

### Required work

- reread all canonical documents;
- compare implementation with definition of done;
- rerun full command set;
- perform secret scan;
- verify clean install where practical;
- update README;
- update `REPOSITORY_CLEANUP_RECOMMENDATIONS.md`;
- complete `docs/IMPLEMENTATION_REPORT.md`;
- finalize `docs/IMPLEMENTATION_STATUS.md`.

### Required command set

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
pnpm start
```

### Exit criteria

- every command outcome is recorded;
- deployment status is truthful;
- remaining missing media/facts are listed;
- no unresolved critical defect is hidden;
- final status says complete only when applicable.

---

## 3. Failure and recovery behavior

When a phase fails:

1. record the exact failure in `IMPLEMENTATION_STATUS.md`;
2. fix the root cause;
3. rerun the failed check;
4. rerun any dependent checks;
5. update status;
6. continue only after the exit criteria pass.

After session interruption or context compression:

1. reread `AGENTS.md`;
2. reread `IMPLEMENTATION_STATUS.md`;
3. verify status against actual files and Git diff;
4. resume active phase;
5. do not repeat completed work unless verification exposes a defect.

## 4. Scope-control rule

Do not add a new feature because it looks impressive.

Add a feature only when it:

- satisfies an explicit requirement;
- improves accessibility;
- improves factual clarity;
- improves project understanding;
- improves maintainability;
- fixes a verified defect.

Record material scope changes in `IMPLEMENTATION_STATUS.md`.
