# SUNSET Website Product Specification

## 1. Product summary

SUNSET is a public, bilingual engineering archive for collaborative projects created by students at Sejong University.

It should make the organization understandable to:

- students considering collaboration;
- professors or reviewers assessing project depth;
- recruiters evaluating contributors;
- technical visitors interested in implementation;
- future members trying to continue older projects.

The website must present real work honestly. It should show how systems operate, what was actually implemented, who contributed when verified, and what remains incomplete.

## 2. Positioning

Approved positioning:

> SUNSET is an independent student engineering collective formed by students at Sejong University.

Full organization name (owner-confirmed):

> **SUNSET** — **Sejong University Network for Science & Engineering Thinkers**

Use the full expansion on About, metadata, and introductory surfaces where it aids clarity. The wordmark may remain **SUNSET** in navigation.

Recommended descriptor:

> Student-built systems after sunset.

Recommended homepage headline:

> WE BUILD AFTER CLASS.

Supporting direction:

> Software, hardware, and experiments created by students at Sejong University.

Do not describe SUNSET as official, university-operated, endorsed, commercial, or institutionally sponsored without formal proof.

Required disclaimer:

> SUNSET is an independent student-led collective. References to Sejong University describe the students’ academic community and do not imply official university endorsement.

Provide a natural Korean equivalent.

## 3. Product principles

1. **Show the system, not only the screenshot.**
2. **Build, then document.**
3. **Keep limitations visible.**
4. **Credit contributors fairly.**
5. **Preserve student work beyond one semester.**
6. **Distinguish working, experimental, proposed, and incomplete work.**
7. **Do not use marketing language stronger than the evidence.**

These are website principles, not historical quotes from members.

## 4. Target experience

A visitor should understand within five seconds:

- what SUNSET is;
- that the work is student-built;
- that it covers software and physical systems;
- that the website is an archive of real projects;
- that the organization is independent from formal university endorsement.

A visitor should understand within one minute:

- the strongest projects;
- how those projects work;
- which projects are prototypes;
- how to explore repositories;
- how to contribute or propose a new project.

## 5. Required routes

```text
/[lang]
/[lang]/projects
/[lang]/projects/[slug]
/[lang]/people
/[lang]/timeline
/[lang]/about
/[lang]/join
```

Supported locales:

- English: `en`
- Korean: `ko`

Root `/` should deterministically redirect to `/en`.

Unsupported locale or project slugs must return a localized or appropriately structured 404.

## 6. Navigation

Desktop navigation:

- SUNSET wordmark;
- Projects;
- People;
- Timeline;
- About;
- Join;
- language switch;
- GitHub organization link.

Mobile navigation:

- native button;
- correct `aria-expanded`;
- visible focus;
- closes on navigation;
- closes on Escape;
- no unnecessary focus trap;
- no dependency for menu behavior.

All pages require a skip-to-content link.

## 7. Homepage content

### 7.1 Hero

Primary headline:

> WE BUILD AFTER CLASS.

The hero should establish:

- independent collective;
- Sejong University student context;
- software, hardware, and experimental work;
- a direct path to projects and GitHub.

Maximum two primary calls to action:

- Explore projects
- View on GitHub

A conceptual time motif may be used:

```text
18:00 — classes end
18:40 — tools open
21:20 — first prototype
01:10 — still debugging
```

These times are visual storytelling only and must not be presented as historical facts.

### 7.2 Homepage sequence

1. Hero
2. Featured project editorial sequence
3. Disciplines or working modes
4. Project lifecycle from question to documented prototype
5. Compact verified activity excerpt
6. Join/start-a-project invitation
7. Footer

Featured projects should be:

- GRIP-5
- Tolqyn
- MoodFlix
- NaeonAir/WisDrone combined case study

Do not display them as four identical cards.

### 7.3 Homepage prohibited content

Do not add:

- fake metrics;
- “trusted by” logos;
- testimonials;
- fake partner marks;
- pricing;
- newsletter;
- generic feature cards;
- technology marquee;
- fake terminal;
- abstract laptop mockup;
- unrelated stock imagery.

## 8. Projects directory

Required functions:

- localized search;
- filter by tier;
- filter by status;
- filter by category;
- combined filters;
- result count;
- clear filters;
- meaningful empty state;
- keyboard accessibility.

Search fields:

- project name;
- verified summary;
- technology;
- category.

Do not add a fuzzy-search dependency.

The directory should behave like an editorial index, not a dashboard.

Display:

- project number;
- project name;
- concise verified summary;
- category;
- status;
- repository count;
- real preview or verified diagram when available.

Public project hierarchy:

### Flagship

- GRIP-5
- Tolqyn
- MoodFlix
- NaeonAir/WisDrone

### Supporting

- Intellichair
- BuildIn
- IKUMPlay
- roastivator
- DSNSim

### Incubator

- aura

### Learning archive

- Queues
- Trees
- Linked-Lists

### Excluded/internal

- dummy-files
- pixel-231a6fa7a5be46149da33813796eea22
- separate wisdrone-ai-drone listing

The website should publish coherent project stories rather than one equal card per repository.

## 9. Project case studies

Use three template families.

### 9.1 Systems template

Use for:

- GRIP-5
- Intellichair
- BuildIn
- NaeonAir/WisDrone

Emphasize:

- input;
- processing;
- communication;
- output;
- hardware/software boundary;
- architecture;
- verified implementation;
- limitations.

### 9.2 Cinematic template

Use for:

- Tolqyn

Emphasize:

- real output imagery or video;
- interaction sources;
- generative behavior;
- technical system behind the visual result;
- restrained text over media.

### 9.3 Editorial/research template

Use for:

- MoodFlix
- IKUMPlay
- roastivator
- DSNSim
- aura
- learning archive

### 9.4 Required case-study sections

Every public project page must include:

1. Project identity
2. Public status
3. Repository links
4. Verified summary
5. Problem or experiment question
6. What was actually built
7. Architecture or workflow
8. Important technical decisions
9. Real media or verified system diagram
10. Contributors when verified
11. Known limitations or incomplete work
12. Related projects when genuinely relevant
13. Clear GitHub link

Use visible labels for:

- implemented;
- experimental;
- proposed;
- incomplete.

Do not create a fake challenge-solution narrative.

## 10. People page

Use only public, verified contributor evidence.

Allowed:

- verified names or GitHub usernames;
- GitHub profile links;
- associated projects;
- neutral alphabetical sorting;
- “Contributor” when role is unknown;
- public avatars with initials fallback.

Prohibited:

- inferred roles;
- commit rankings;
- contribution percentages;
- private email addresses;
- hierarchy without evidence;
- identity assumptions based on commit email.

When contributor information is incomplete, explain the collective model and show only verified profiles.

## 11. Timeline page

Use verifiable GitHub activity and documented milestones.

Repository-derived dates must be labeled:

> GitHub activity

Do not rename them:

- Founded
- Started
- Released
- Semester launch

unless directly verified.

Possible timeline evidence:

- first public commit;
- documented version;
- repository creation;
- documented demo;
- verified integration;
- documented completion.

Include a short explanation that GitHub dates do not necessarily equal project start dates.

## 12. About page

Explain:

- what SUNSET is;
- why the archive exists;
- the range of technical disciplines;
- how projects are documented;
- why incomplete work remains visible;
- the independent relationship to Sejong University.

Do not invent an origin story.

## 13. Join page

Do not build a fake form.

Explain:

- who can participate;
- what kinds of projects belong;
- how to propose a project;
- documentation expectations;
- contribution expectations;
- repository-readiness checklist.

Proposal checklist:

- problem or experiment question;
- expected output;
- likely technologies;
- hardware needs;
- contributor needs;
- safety/privacy concerns;
- demonstration plan;
- repository owner;
- documentation owner.

Do not invent an email, KakaoTalk channel, Discord, deadline, or approval process.

## 14. Internationalization

Use path-based locale routing.

Examples:

```text
/en/projects/grip-5
/ko/projects/grip-5
```

Requirements:

- typed locale guard;
- static dictionary imports;
- `generateStaticParams()` for locales and project slugs;
- path-preserving language switch;
- no locale cookie required;
- no request-header locale detection;
- Korean text must be natural;
- English and Korean claims must remain equivalent;
- project/library/protocol names remain untranslated unless an official localized name exists.

Do not duplicate entire project records per locale. Keep localized fields within a shared typed record.

## 15. Content model

Create a typed central model similar to:

```ts
export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];

export type ProjectStatus =
  | "concept"
  | "prototype"
  | "working-prototype"
  | "completed"
  | "learning"
  | "archived";

export type ProjectTier =
  | "flagship"
  | "supporting"
  | "incubator"
  | "learning";

export type ProjectCategory =
  | "robotics"
  | "embedded"
  | "ai-experiment"
  | "creative-coding"
  | "web"
  | "education";

export type Project = {
  slug: string;
  name: string;
  tier: ProjectTier;
  status: ProjectStatus;
  categories: readonly ProjectCategory[];
  layout: "cinematic" | "systems" | "editorial";
  repositories: readonly {
    name: string;
    url: string;
  }[];
  summary: Record<Locale, string>;
  problem: Record<Locale, string>;
  implementation: Record<Locale, readonly string[]>;
  architecture: Record<Locale, readonly string[]>;
  decisions: Record<Locale, readonly string[]>;
  limitations: Record<Locale, readonly string[]>;
  technologies: readonly string[];
  contributors: readonly string[];
  media: readonly MediaAsset[];
};
```

Use readonly data and `satisfies`.

Build-time assertions must reject:

- duplicate slugs;
- unsupported categories;
- missing locale text;
- missing media files;
- missing repository links;
- empty limitations;
- accidental public inclusion of excluded repositories;
- invalid localized paths.

## 16. Media policy

Search repositories for real:

- photos;
- screenshots;
- diagrams;
- GIFs;
- demo videos;
- renders;
- schematics.

Copy approved assets into:

`public/projects/<slug>/`

Maintain an asset manifest with:

- local path;
- source repository;
- source path;
- type;
- attribution or license note;
- alt-text;
- evidence category.

Do not hotlink GitHub assets at runtime.

Do not use:

- unrelated stock photos;
- AI-generated devices;
- fake dashboards;
- fake app screenshots;
- placeholder image services;
- random image-search results.

When no real visual exists, create an original SVG system diagram based only on verified architecture and label it “System diagram.”

## 17. Metadata and discoverability

Implement:

- localized metadata;
- title templates;
- descriptions;
- canonical URLs;
- language alternates;
- Open Graph;
- Twitter cards;
- per-project metadata;
- icons;
- manifest;
- robots;
- sitemap;
- conservative JSON-LD.

Allowed structured-data direction:

- `Organization` for SUNSET;
- `CreativeWork` or `SoftwareSourceCode` for project pages.

Do not use `CollegeOrUniversity` or invent a founding date, address, member count, or official logo relationship.

## 18. Static-first technical boundaries

Initial release requires no environment variable except an optional public canonical-site URL:

`NEXT_PUBLIC_SITE_URL`

The site must build without it using a safe local fallback.

Do not add:

- database;
- CMS;
- authentication;
- runtime GitHub API;
- form backend;
- analytics;
- server actions without a real requirement.

## 19. Error and empty states

Implement:

- localized 404;
- unsupported locale;
- unknown project;
- route error where meaningful;
- no-results filter state;
- missing optional media fallback.

Never expose stack traces.

## 20. Security and privacy

Never expose repository secrets or private infrastructure.

Use reasonable static security headers where compatible:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- restrictive `Permissions-Policy`
- clickjacking protection
- appropriate static Content Security Policy when practical

Disable the framework-powered header.

Do not weaken the architecture to add nonce-based dynamic rendering for a static site.

## 21. Accessibility

Target WCAG 2.2 AA behavior.

Required:

- semantic landmarks;
- one meaningful `h1`;
- sequential headings;
- skip link;
- keyboard navigation;
- visible focus;
- native controls;
- accessible filters;
- current navigation indication;
- reduced motion;
- language attributes;
- adequate contrast;
- useful alt text;
- no color-only meaning;
- touch-friendly targets;
- 200% zoom usability;
- Korean line-height and wrapping checks.

## 22. Performance

Goals:

- static generation;
- minimal client JavaScript;
- optimized images;
- `next/font`;
- limited font weights;
- no third-party blocking scripts;
- no unnecessary hydration;
- no large animation/UI package;
- no large video loaded immediately without justification.

When Lighthouse is available, target:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Never invent a score when it was not run.

## 23. Public status vocabulary

Use only:

- Concept
- Prototype
- Working Prototype
- Completed
- Learning Archive
- Archived

Do not use:

- Revolutionary
- Cutting Edge
- Industry Grade
- Production Ready
- Advanced AI

unless independently demonstrated.

## 24. Definition of done

### Content

- Public repository treatment matches the repository audit.
- No unsupported claims.
- No fake roles, dates, awards, metrics, or media.
- Drone repositories are consolidated.
- Excluded repositories are absent from public routes.
- Every public project includes limitations.
- English and Korean content are complete.
- No placeholder copy or images.

### Design

- Distinct SUNSET identity.
- Editorial engineering-archive feeling.
- Real evidence or verified diagrams dominate.
- Project layouts reflect project type.
- Homepage does not resemble a SaaS template.
- Mobile is intentionally composed.
- Korean typography is verified.
- Motion is restrained and purposeful.

### Engineering

- Next.js App Router.
- Server Components by default.
- Narrow client boundaries.
- Strict TypeScript.
- Tailwind v4 design tokens.
- Lazy Motion usage.
- Reduced-motion support.
- Named Lucide imports.
- Local typed content.
- No database, CMS, or runtime GitHub dependency.
- Metadata, sitemap, robots, manifest.
- Optimized images and fonts.
- No secrets.

### Verification

- ESLint passes.
- Type checking passes.
- Production build passes.
- Playwright tests pass.
- Serious and critical axe issues are resolved.
- Representative routes have no console errors or failed assets.
- No horizontal overflow at required viewports.
- Keyboard navigation works.
- Language switching preserves path.
- Screenshots were captured and reviewed.
- Actual outcomes are recorded in `IMPLEMENTATION_REPORT.md`.
