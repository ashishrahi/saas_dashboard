import { Separator } from "@/components/ui/separator"
import { Panel } from "./panel"
import { TableToolbar } from "./table-toolbar"
import { FilterBar } from "./filter-bar"
import { text } from "@/lib/theme/typography"
import { cn } from "@/lib/utils"

export interface PageHeaderProps {
  title?: string
  description?: string
  className?: string
  onAdd?: () => void
  addLabel?: string
  onDownloadCsv?: () => void
  onDownloadAll?: () => void
  search?: string
  onSearchChange?: (val: string) => void
  searchPlaceholder?: string
  status?: string
  onStatusChange?: (val: string) => void
  startDate?: string
  onStartDateChange?: (val: string) => void
  endDate?: string
  onEndDateChange?: (val: string) => void
  onClear?: () => void
}

export function PageHeader({
  title = "List",
  description,
  className,
  onAdd,
  addLabel = "Add",
  onDownloadCsv,
  onDownloadAll,
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  status,
  onStatusChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onClear,
}: PageHeaderProps) {
  const hasFilters =
    onSearchChange || onStatusChange || onStartDateChange || onEndDateChange

  return (
    <Panel className={cn("flex flex-col gap-5", className)}>
      <TableToolbar
        onAdd={onAdd}
        addLabel={addLabel}
        onDownloadCsv={onDownloadCsv}
        onDownloadAll={onDownloadAll}
        onClear={onClear}
      >
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className={cn(text.h3, "tracking-tight")}>{title}</h2>
          {description && (
            <p className={cn(text.caption, "font-normal normal-case tracking-normal")}>
              {description}
            </p>
          )}
        </div>
      </TableToolbar>

      {hasFilters && (
        <>
          <Separator />
          <FilterBar
            search={search}
            onSearchChange={onSearchChange}
            searchPlaceholder={searchPlaceholder}
            status={status}
            onStatusChange={onStatusChange}
            startDate={startDate}
            onStartDateChange={onStartDateChange}
            endDate={endDate}
            onEndDateChange={onEndDateChange}
          />
        </>
      )}
    </Panel>
  )
}
