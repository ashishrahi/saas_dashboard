import type { LucideIcon } from "lucide-react"

export type SearchResultKind = "navigation" | "entity"

export type SearchEntityType = "user" | "category" | "feature" | "plan"

export interface SearchResult {
  id: string
  kind: SearchResultKind
  title: string
  subtitle?: string
  href: string
  icon?: LucideIcon
  entityType?: SearchEntityType
  badge?: string
}

export interface SearchResultGroup {
  id: string
  label: string
  results: SearchResult[]
}

export interface GlobalSearchResults {
  groups: SearchResultGroup[]
  flatResults: SearchResult[]
}

/** Contract for a future backend-powered search provider */
export interface GlobalSearchProvider {
  search(query: string, signal?: AbortSignal): Promise<GlobalSearchResults>
}
