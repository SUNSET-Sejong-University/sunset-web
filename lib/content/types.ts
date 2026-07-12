import type { Locale } from "@/lib/i18n/locales";

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

export type ProjectLayout = "cinematic" | "systems" | "editorial";

export type ImplementationLabel =
  | "implemented"
  | "experimental"
  | "proposed"
  | "incomplete";

export type MediaAsset = {
  path: string;
  alt: Record<Locale, string>;
  kind: "diagram" | "photo" | "screenshot" | "video";
  caption?: Record<Locale, string>;
};

export type ProjectRepository = {
  name: string;
  url: string;
};

export type LocalizedStrings = Record<Locale, string>;

export type LocalizedList = Record<Locale, readonly string[]>;

export type Project = {
  slug: string;
  number: number;
  name: string;
  tier: ProjectTier;
  status: ProjectStatus;
  categories: readonly ProjectCategory[];
  layout: ProjectLayout;
  repositories: readonly ProjectRepository[];
  summary: LocalizedStrings;
  problem: LocalizedStrings;
  implementation: LocalizedList;
  architecture: LocalizedList;
  decisions: LocalizedList;
  limitations: LocalizedList;
  technologies: readonly string[];
  contributors: readonly string[];
  relatedSlugs: readonly string[];
  media: readonly MediaAsset[];
  labels: readonly ImplementationLabel[];
};

export type Contributor = {
  id: string;
  displayName: string;
  githubUsername?: string;
  githubUrl?: string;
  role: LocalizedStrings;
  projectSlugs: readonly string[];
};

export type TimelineEventType = "repo-created" | "repo-updated" | "milestone";

export type TimelineEvent = {
  id: string;
  date: string;
  type: TimelineEventType;
  repository?: string;
  projectSlug?: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};
