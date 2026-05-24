import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { getBreadcrumbsFromPath, type BreadcrumbSegment } from "./breadcrumbs"

export function useBreadcrumbs(): BreadcrumbSegment[] {
  const location = useLocation()

  return useMemo(
    () => getBreadcrumbsFromPath(location.pathname),
    [location.pathname]
  )
}

export type { BreadcrumbSegment }
