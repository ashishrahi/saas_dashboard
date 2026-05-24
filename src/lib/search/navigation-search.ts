import { APP_NAV_ITEMS } from "@/lib/navigation/app-routes"
import type { SearchResult } from "./types"

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function matchesNavigation(query: string, title: string, keywords: string[] = []): boolean {
  const q = normalize(query)
  if (!q) return true

  const haystack = [title, ...keywords].map(normalize)
  return haystack.some((term) => term.includes(q) || q.includes(term))
}

export function getNavigationSearchResults(query: string): SearchResult[] {
  return APP_NAV_ITEMS.filter((item) =>
    matchesNavigation(query, item.title, item.keywords)
  ).map((item) => ({
    id: `nav-${item.to}`,
    kind: "navigation" as const,
    title: item.title,
    subtitle: "Go to page",
    href: item.to,
    icon: item.icon,
    badge: "Page",
  }))
}
