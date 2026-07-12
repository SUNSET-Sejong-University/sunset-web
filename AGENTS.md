# SUNSET Website Agent Instructions

This file contains persistent, non-negotiable operating rules for every agent working in this repository.

## 1. Required reading

Before making substantial changes:

1. Read this file.
2. Read `docs/IMPLEMENTATION_STATUS.md`.
3. Read the active phase in `docs/IMPLEMENTATION_PLAN.md`.
4. Read only the other canonical documents relevant to the current phase:
   - product/content work: `docs/PRODUCT_SPEC.md`
   - project claims and repository treatment: `docs/REPOSITORY_AUDIT.md`
   - layout, typography, motion, and visual work: `docs/DESIGN_SYSTEM.md`
   - naming, modules, and boundaries: `docs/CODEBASE_CONVENTIONS.md`
   - completion and verification: `docs/IMPLEMENTATION_PLAN.md` and `docs/IMPLEMENTATION_REPORT.md`

Before declaring the project complete, reread every canonical document.

## 2. Source of truth

The canonical specification files are:

- `docs/PRODUCT_SPEC.md`
- `docs/REPOSITORY_AUDIT.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/CODEBASE_CONVENTIONS.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/IMPLEMENTATION_STATUS.md`

Do not rely on chat memory when a canonical file exists.

If implementation evidence contradicts a document:

1. verify the evidence;
2. record the discrepancy in `docs/IMPLEMENTATION_STATUS.md`;
3. update the relevant canonical document;
4. continue using the corrected version.

Never silently ignore a requirement.

## 3. Factual integrity

Never invent or infer unsupported:

- project dates;
- semesters;
- awards;
- metrics;
- deployment status;
- user counts;
- model accuracy;
- course names;
- team size;
- contributor roles;
- sponsors;
- partnerships;
- official university recognition;
- media;
- testimonials;
- project outcomes.

Repository creation or commit dates may be labeled only as GitHub activity unless another source verifies their meaning.

Use “Contributor” when a more specific role is not directly verified.

Do not rank contributors by commits or contribution percentages.

## 4. Organization positioning

SUNSET must be presented as:

> An independent student engineering collective formed by students at Sejong University.

Do not imply that SUNSET is an official Sejong University body, department, laboratory, club, partner, or endorsed organization unless formal proof is provided.

Every public surface that could create ambiguity must use an appropriate independent-status disclaimer.

## 5. Repository and security boundaries

Inspect repositories at code level where access permits. Do not rely only on README files.

Never copy, expose, display, log, or commit:

- API keys;
- OAuth secrets;
- passwords;
- Wi-Fi credentials;
- private IP addresses;
- tokens;
- private email addresses;
- sensitive `.env` values.

If secrets are discovered, record only that secret rotation and history cleanup are required. Never copy the value into documentation.

Do not modify the individual project repositories from this website repository.

## 6. Product boundaries

The public website is a static-first engineering archive and project laboratory.

Initial release must not add:

- authentication;
- user accounts;
- database;
- CMS;
- dashboard;
- shop;
- payment;
- chat;
- AI assistant;
- social feed;
- leaderboard;
- fake application form;
- runtime GitHub dependency;
- analytics;
- unnecessary backend.

Do not expand scope without a verified requirement.

## 7. Approved stack

Use the smallest production-grade stack:

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Motion for React
- Lucide React
- ESLint
- Playwright
- `@axe-core/playwright`

Do not add shadcn/ui, Radix, Material UI, Chakra, Bootstrap, a CMS, a database, MDX, next-intl, state-management packages, carousel packages, Three.js, particles, or another animation/icon library unless an unavoidable technical reason is documented first.

Use `pnpm` unless an existing legitimate lockfile establishes another package manager.

## 8. Architecture rules

- Server Components are the default.
- Client Components must be narrow interactive islands.
- Do not place `"use client"` on root layouts, full pages, static case-study sections, content renderers, or the footer.
- Keep project content local, typed, and build-time validated.
- Prefer static generation.
- Do not fetch GitHub data at runtime.
- Do not use cookies or request headers only to choose locale.
- Avoid `useEffect` when values can be derived during render.
- Avoid abstractions that do not improve reuse, semantics, or maintainability.

## 9. Type and code quality

Maintain strict TypeScript.

Do not use:

- `any`;
- `@ts-ignore`;
- blind type assertions;
- broad lint disables;
- duplicated content types;
- unchecked dictionary indexing;
- placeholder TODO code;
- dead code;
- copied starter-template text.

Use discriminated unions, `satisfies`, readonly content, and explicit error states.

## 10. Design quality

Read `docs/DESIGN_SYSTEM.md` before significant visual work.

Do not produce a generic AI/SaaS website.

Avoid:

- glowing gradient blobs;
- glassmorphism;
- excessive cards;
- universal bento grids;
- giant centered hero text with a pill above it;
- fake browser windows;
- fake terminals;
- random 3D objects;
- technology marquees;
- fake metrics;
- meaningless animation;
- excessive `rounded-3xl`;
- startup language;
- decorative project claims.

Real project evidence, diagrams, system flows, and technical decisions must dominate.

## 11. Accessibility and motion

Target WCAG 2.2 AA behavior.

Required:

- semantic landmarks;
- skip link;
- visible focus;
- keyboard navigation;
- accurate labels;
- no keyboard traps;
- sufficient contrast;
- reduced-motion behavior;
- correct language attributes;
- accessible filters and mobile navigation;
- meaningful image alternatives.

Motion must explain state, hierarchy, or system flow. Never block reading or hijack scrolling.

## 12. Working memory

After every phase, and after every meaningful interruption or failure, update:

`docs/IMPLEMENTATION_STATUS.md`

Record:

- active phase;
- completed work;
- files changed;
- commands actually run;
- actual outcomes;
- unresolved failures;
- assumptions;
- missing media or facts;
- major decisions;
- next actions.

Do not mark a phase complete without satisfying its exit criteria.

## 13. Verification discipline

Do not claim success based on visual inspection alone.

Do not claim success based on a passing build alone.

Before completion, run every applicable command:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```

Start the production server and inspect required routes at required viewports.

Check:

- console errors;
- failed assets;
- hydration warnings;
- horizontal overflow;
- mobile navigation;
- filters;
- localization;
- metadata;
- reduced motion;
- keyboard flow;
- accessibility.

If a tool cannot run, report that honestly in `docs/IMPLEMENTATION_REPORT.md`.

## 14. Completion behavior

Do not stop at the first successful render.

Do not stop after the first successful production build.

The work is complete only when:

1. all applicable definition-of-done items pass;
2. screenshots have been reviewed;
3. remaining limitations are documented;
4. `docs/IMPLEMENTATION_STATUS.md` is current;
5. `docs/IMPLEMENTATION_REPORT.md` contains actual results.

Never call the website production-ready without evidence.
