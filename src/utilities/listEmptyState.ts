type ListFilterState = {
  filterText?: string
  status?: string
  startDate?: string
  endDate?: string
}

export function hasListFilters({
  filterText,
  status,
  startDate,
  endDate,
}: ListFilterState): boolean {
  return Boolean(
    filterText?.trim() ||
      (status && status !== "all") ||
      startDate ||
      endDate
  )
}

export function getListEmptyState(hasFilters: boolean) {
  return {
    emptyMessage: hasFilters
      ? "No results match your filters"
      : "No data available",
    emptyDescription: hasFilters
      ? "Try adjusting your search or filters, or clear them to see all items."
      : undefined,
  }
}

export function isValidDate(value: unknown): value is Date {
  if (!value) return false
  const date = value instanceof Date ? value : new Date(String(value))
  return !Number.isNaN(date.getTime())
}
