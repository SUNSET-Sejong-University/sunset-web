"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { StatusBadge } from "@/components/ui/primitives";
import type { Project, ProjectCategory, ProjectStatus, ProjectTier } from "@/lib/content/types";
import type { ClientProjectDirectoryDictionary } from "@/lib/i18n/client-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

type ProjectDirectoryProps = {
  locale: Locale;
  dictionary: ClientProjectDirectoryDictionary;
  projects: readonly Project[];
};

type Filters = {
  query: string;
  tier: ProjectTier | "all";
  status: ProjectStatus | "all";
  category: ProjectCategory | "all";
};

function matchesQuery(project: Project, locale: Locale, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return true;
  }
  const haystack = [
    project.name,
    project.summary[locale],
    ...project.technologies,
    ...project.categories,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(normalized);
}

function tierClass(tier: ProjectTier): string {
  if (tier === "flagship") {
    return "archive-entry archive-entry--flagship";
  }
  return "archive-entry";
}

export function ProjectDirectory({
  locale,
  dictionary,
  projects,
}: ProjectDirectoryProps) {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    tier: "all",
    status: "all",
    category: "all",
  });

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (filters.tier !== "all" && project.tier !== filters.tier) {
        return false;
      }
      if (filters.status !== "all" && project.status !== filters.status) {
        return false;
      }
      if (
        filters.category !== "all" &&
        !project.categories.includes(filters.category)
      ) {
        return false;
      }
      return matchesQuery(project, locale, filters.query);
    });
  }, [filters, locale, projects]);

  const tiers: Array<ProjectTier | "all"> = [
    "all",
    "flagship",
    "supporting",
    "incubator",
    "learning",
  ];
  const statuses: Array<ProjectStatus | "all"> = [
    "all",
    "working-prototype",
    "prototype",
    "concept",
    "completed",
    "learning",
    "archived",
  ];
  const categories: Array<ProjectCategory | "all"> = [
    "all",
    "robotics",
    "embedded",
    "ai-experiment",
    "creative-coding",
    "web",
    "education",
  ];

  const clearFilters = () => {
    setFilters({
      query: "",
      tier: "all",
      status: "all",
      category: "all",
    });
  };

  return (
    <div className="wrap page-section">
      <div className="archive-controls reveal">
        <div className="archive-controls-head">
          <h2>{dictionary.common.filterPanelTitle}</h2>
        </div>
        <div className="control-grid">
          <div className="control-field">
            <span className="control-label" id="archive-search-label">
              {dictionary.common.searchPlaceholder}
            </span>
            <div className="control-search-wrap">
              <Search aria-hidden />
              <input
                id="archive-search"
                type="search"
                className="control-input"
                value={filters.query}
                aria-labelledby="archive-search-label"
                placeholder={dictionary.common.searchPlaceholder}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    query: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <FilterSelect
            id="archive-tier"
            label={dictionary.common.filterTier}
            value={filters.tier}
            options={tiers.map((value) => ({
              value,
              label: value === "all" ? dictionary.common.all : dictionary.tier[value],
            }))}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                tier: value as Filters["tier"],
              }))
            }
          />
          <FilterSelect
            id="archive-status"
            label={dictionary.common.filterStatus}
            value={filters.status}
            options={statuses.map((value) => ({
              value,
              label: value === "all" ? dictionary.common.all : dictionary.status[value],
            }))}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                status: value as Filters["status"],
              }))
            }
          />
          <FilterSelect
            id="archive-category"
            label={dictionary.common.filterCategory}
            value={filters.category}
            options={categories.map((value) => ({
              value,
              label:
                value === "all" ? dictionary.common.all : dictionary.category[value],
            }))}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                category: value as Filters["category"],
              }))
            }
          />
        </div>
        <div className="control-actions" style={{ marginTop: 16 }}>
          <button type="button" className="btn-reset" onClick={clearFilters}>
            {dictionary.common.clearFilters}
          </button>
        </div>
      </div>

      <p className="archive-count" aria-live="polite" aria-atomic="true">
        {filtered.length === 1
          ? dictionary.common.resultCountSingular
          : dictionary.common.resultCountPlural.replace(
              "{count}",
              String(filtered.length),
            )}
      </p>

      {filtered.length === 0 ? (
        <div className="archive-empty">
          <h3>{dictionary.common.noResults}</h3>
          <p>{dictionary.common.noResultsHint}</p>
        </div>
      ) : (
        <ol className="archive-index reveal">
          {filtered.map((project) => (
            <li key={project.slug} className={tierClass(project.tier)}>
              <Link
                href={localizedPath(locale, `projects/${project.slug}`)}
                className="archive-entry-link"
              >
                <span className="archive-ref mono">
                  P-{String(project.number).padStart(2, "0")}
                </span>
                <div className="archive-entry-main">
                  <div className="spec-badge-row">
                    <h2>{project.name}</h2>
                    <StatusBadge
                      label={dictionary.status[project.status]}
                      tone="accent"
                    />
                  </div>
                  <p>{project.summary[locale]}</p>
                  <div className="spec-badge-row">
                    {project.categories.map((category) => (
                      <StatusBadge
                        key={category}
                        label={dictionary.category[category]}
                      />
                    ))}
                  </div>
                </div>
                <div className="archive-meta">
                  <span>{dictionary.tier[project.tier]}</span>
                  <span>
                    {project.repositories.length}{" "}
                    {project.repositories.length === 1
                      ? dictionary.common.repository
                      : dictionary.common.repositories}
                  </span>
                  <span>{project.technologies.slice(0, 3).join(" · ")}</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="control-field">
      <label className="control-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="control-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
