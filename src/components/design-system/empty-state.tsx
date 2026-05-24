import { Inbox } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  className?: string
  action?: React.ReactNode
}

export function EmptyState({
  title = "No data available",
  description,
  icon,
  className,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-4 py-10 text-center sm:px-6 sm:py-12",
        className
      )}
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-muted-foreground">
        {icon ?? <Inbox className="size-6" />}
      </div>
      <div className="w-full max-w-sm space-y-1">
        <p className="text-heading text-sm font-medium">{title}</p>
        {description && (
          <p className="text-muted-foreground break-words text-sm">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
