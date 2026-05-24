import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TableToolbarProps {
  children?: React.ReactNode
  onAdd?: () => void
  addLabel?: string
  onDownloadCsv?: () => void
  onDownloadAll?: () => void
  onClear?: () => void
  className?: string
}

export function TableToolbar({
  children,
  onAdd,
  addLabel = "Add",
  onDownloadCsv,
  onDownloadAll,
  onClear,
  className,
}: TableToolbarProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4", className)}>
      {children}
      <div className="flex flex-wrap gap-2">
        {onDownloadCsv && (
          <Button variant="secondary" size="sm" onClick={onDownloadCsv}>
            Download CSV
          </Button>
        )}
        {onDownloadAll && (
          <Button variant="secondary" size="sm" onClick={onDownloadAll}>
            Download All
          </Button>
        )}
        {onClear && (
          <Button variant="outline" size="sm" onClick={onClear}>
            Clear
          </Button>
        )}
        {onAdd && (
          <Button size="sm" onClick={onAdd}>
            {addLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
