import { existsSync } from "node:fs";
import { join } from "node:path";

import { EXCLUDED_REPOSITORIES } from "@/lib/content/site";
import type { Project } from "@/lib/content/types";
import { locales, type Locale } from "@/lib/i18n/locales";

import { projects } from "./data";

const PUBLIC_ROOT = join(process.cwd(), "public");

function assertLocalizedField(
  project: Project,
  field: keyof Pick<
    Project,
    "summary" | "problem" | "implementation" | "architecture" | "decisions" | "limitations"
  >,
): void {
  for (const locale of locales) {
    const value = project[field];
    if (typeof value === "object" && locale in value) {
      const localized = value[locale as Locale];
      if (
        localized === undefined ||
        (Array.isArray(localized) && localized.length === 0) ||
        (typeof localized === "string" && localized.trim().length === 0)
      ) {
        throw new Error(
          `Project "${project.slug}" is missing ${field}.${locale}`,
        );
      }
      continue;
    }
    throw new Error(`Project "${project.slug}" is missing ${field}.${locale}`);
  }
}

function validateProject(project: Project): void {
  for (const repo of project.repositories) {
    if (EXCLUDED_REPOSITORIES.includes(repo.name as (typeof EXCLUDED_REPOSITORIES)[number])) {
      throw new Error(
        `Excluded repository "${repo.name}" appears in public project "${project.slug}"`,
      );
    }
  }

  if (project.limitations.en.length === 0 || project.limitations.ko.length === 0) {
    throw new Error(`Project "${project.slug}" must include limitations in every locale`);
  }

  assertLocalizedField(project, "summary");
  assertLocalizedField(project, "problem");
  assertLocalizedField(project, "implementation");
  assertLocalizedField(project, "architecture");
  assertLocalizedField(project, "decisions");
  assertLocalizedField(project, "limitations");

  for (const asset of project.media) {
    const absolutePath = join(PUBLIC_ROOT, asset.path.replace(/^\//, ""));
    if (!existsSync(absolutePath)) {
      throw new Error(
        `Project "${project.slug}" references missing media at ${asset.path}`,
      );
    }
    for (const locale of locales) {
      if (!asset.alt[locale]?.trim()) {
        throw new Error(
          `Project "${project.slug}" media ${asset.path} is missing alt.${locale}`,
        );
      }
    }
  }
}

export function validateProjects(collection: readonly Project[]): void {
  const slugs = new Set<string>();

  for (const project of collection) {
    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }
    slugs.add(project.slug);
    validateProject(project);
  }
}

validateProjects(projects);

export { projects };

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): readonly string[] {
  return projects.map((project) => project.slug);
}

export function getRelatedProjects(slug: string): Project[] {
  const project = getProjectBySlug(slug);
  if (!project) {
    return [];
  }
  return project.relatedSlugs
    .map((relatedSlug) => getProjectBySlug(relatedSlug))
    .filter((item): item is Project => item !== undefined);
}

export function getProjectsByTier(tier: Project["tier"]): Project[] {
  return projects.filter((project) => project.tier === tier);
}

export function getFlagshipProjects(): Project[] {
  return projects.filter((project) => project.tier === "flagship");
}
