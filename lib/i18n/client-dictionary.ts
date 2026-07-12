import type { Dictionary } from "@/lib/i18n/dictionaries";

export type ClientNavDictionary = Pick<
  Dictionary,
  "nav" | "site" | "probe"
>;

export function pickClientNavDictionary(
  dictionary: Dictionary,
): ClientNavDictionary {
  return {
    nav: dictionary.nav,
    site: dictionary.site,
    probe: dictionary.probe,
  };
}

export type ClientProjectDirectoryDictionary = {
  common: Pick<
    Dictionary["common"],
    | "searchPlaceholder"
    | "clearFilters"
    | "resultCountSingular"
    | "resultCountPlural"
    | "noResults"
    | "noResultsHint"
    | "filterTier"
    | "filterStatus"
    | "filterCategory"
    | "filterPanelTitle"
    | "all"
    | "repository"
    | "repositories"
  >;
  tier: Dictionary["tier"];
  status: Dictionary["status"];
  category: Dictionary["category"];
};

export function pickProjectDirectoryDictionary(
  dictionary: Dictionary,
): ClientProjectDirectoryDictionary {
  return {
    common: {
      searchPlaceholder: dictionary.common.searchPlaceholder,
      clearFilters: dictionary.common.clearFilters,
      resultCountSingular: dictionary.common.resultCountSingular,
      resultCountPlural: dictionary.common.resultCountPlural,
      noResults: dictionary.common.noResults,
      noResultsHint: dictionary.common.noResultsHint,
      filterTier: dictionary.common.filterTier,
      filterStatus: dictionary.common.filterStatus,
      filterCategory: dictionary.common.filterCategory,
      filterPanelTitle: dictionary.common.filterPanelTitle,
      all: dictionary.common.all,
      repository: dictionary.common.repository,
      repositories: dictionary.common.repositories,
    },
    tier: dictionary.tier,
    status: dictionary.status,
    category: dictionary.category,
  };
}
