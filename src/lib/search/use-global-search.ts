import { useMemo } from "react"
import { getEntitySearchResults } from "./entity-search"
import { getNavigationSearchResults } from "./navigation-search"
import type { EntitySearchSource } from "./entity-search"
import type { GlobalSearchResults, SearchResult, SearchResultGroup } from "./types"

function buildGroups(
  navigation: SearchResult[],
  entities: SearchResult[]
): SearchResultGroup[] {
  const groups: SearchResultGroup[] = []

  if (navigation.length > 0) {
    groups.push({ id: "navigation", label: "Navigation", results: navigation })
  }

  if (entities.length > 0) {
    groups.push({ id: "entities", label: "Entities", results: entities })
  }

  return groups
}

export function useGlobalSearch(
  query: string,
  entitySource: EntitySearchSource
): GlobalSearchResults {
  return useMemo(() => {
    const navigation = getNavigationSearchResults(query)
    const entities = getEntitySearchResults(query, entitySource)
    const groups = buildGroups(navigation, entities)
    const flatResults = groups.flatMap((g) => g.results)

    return { groups, flatResults }
  }, [query, entitySource])
}
