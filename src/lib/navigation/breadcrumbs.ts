export interface BreadcrumbSegment {
  label: string
  href?: string
}

interface RouteBreadcrumbEntry {
  label: string
  parent?: string
}

/** Central route → breadcrumb metadata for authenticated admin pages */
export const routeBreadcrumbConfig: Record<string, RouteBreadcrumbEntry> = {
  "/": { label: "Overview" },
  "/users": { label: "Users", parent: "/" },
  "/categories": { label: "Categories", parent: "/" },
  "/subcategories": { label: "Subcategories", parent: "/" },
  "/features": { label: "Features", parent: "/" },
  "/plan": { label: "Plans", parent: "/" },
  "/contact": { label: "Contact", parent: "/" },
  "/profile": { label: "Profile", parent: "/" },
  "/settings": { label: "Settings", parent: "/" },
}

/**
 * Build breadcrumb trail from a pathname using route config.
 * Supports nested admin routes via parent chain and optional dynamic overrides.
 */
export function getBreadcrumbsFromPath(
  pathname: string,
  overrides?: BreadcrumbSegment[]
): BreadcrumbSegment[] {
  if (overrides?.length) {
    return overrides
  }

  const normalized = normalizePath(pathname)

  if (normalized === "/") {
    return [{ label: "Home" }]
  }

  const entry = routeBreadcrumbConfig[normalized]
  if (!entry) {
    return [{ label: "Home", href: "/" }]
  }

  return [
    { label: "Home", href: "/" },
    { label: entry.label },
  ]
}

/** Resolve dynamic detail segments (e.g. /categories/123 → Categories > Item detail) */
export function getBreadcrumbsWithDetail(
  pathname: string,
  detailLabel: string
): BreadcrumbSegment[] {
  const basePath = getBaseListPath(pathname)
  const base = getBreadcrumbsFromPath(basePath)

  return [
    ...base,
    {
      label: detailLabel,
    },
  ]
}

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "") || "/"
  return trimmed
}

function getBaseListPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean)
  if (parts.length <= 1) return normalizePath(pathname)
  return `/${parts[0]}`
}
