import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { CategoryService } from "@/Services/categoryService"
import { FeatureService } from "@/Services/featureService"
import { PlanService } from "@/Services/planService"
import { UserService } from "@/Services/userService"
import type { EntitySearchSource } from "./entity-search"

const GLOBAL_SEARCH_STALE_MS = 1000 * 60 * 5
const FEATURE_SEARCH_LIMIT = 200

/**
 * Loads list data for entity search when the palette is open.
 * Reuses React Query cache keys aligned with list pages where possible.
 */
export function useGlobalSearchData(enabled: boolean) {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: UserService.getAll,
    select: (res) => res.data,
    staleTime: GLOBAL_SEARCH_STALE_MS,
    enabled,
  })

  const categoriesQuery = useQuery({
    queryKey: ["categories", {}],
    queryFn: () => CategoryService.getAll({}),
    select: (res) => res.data,
    staleTime: GLOBAL_SEARCH_STALE_MS,
    enabled,
  })

  const plansQuery = useQuery({
    queryKey: ["plans", {}],
    queryFn: () => PlanService.getAll({}),
    select: (res) => res.data,
    staleTime: GLOBAL_SEARCH_STALE_MS,
    enabled,
  })

  const featuresQuery = useQuery({
    queryKey: ["features", "global-search"],
    queryFn: () =>
      FeatureService.getAll({ page: 1, limit: FEATURE_SEARCH_LIMIT }),
    select: (res) => res.data,
    staleTime: GLOBAL_SEARCH_STALE_MS,
    enabled,
  })

  const source: EntitySearchSource = useMemo(
    () => ({
      users: usersQuery.data ?? [],
      categories: categoriesQuery.data ?? [],
      features: featuresQuery.data ?? [],
      plans: plansQuery.data ?? [],
    }),
    [usersQuery.data, categoriesQuery.data, featuresQuery.data, plansQuery.data]
  )

  const isLoading =
    enabled &&
    (usersQuery.isLoading ||
      categoriesQuery.isLoading ||
      plansQuery.isLoading ||
      featuresQuery.isLoading)

  return { source, isLoading }
}
