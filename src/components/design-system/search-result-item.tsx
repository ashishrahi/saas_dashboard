import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { patterns } from "@/lib/theme/patterns"
import { radius } from "@/lib/theme/radius"
import type { SearchResult } from "@/lib/search/types"

export interface SearchResultItemProps {
  result: SearchResult
  active?: boolean
  onSelect: (result: SearchResult) => void
  onHover?: () => void
}

export function SearchResultItem({
  result,
  active = false,
  onSelect,
  onHover,
}: SearchResultItemProps) {
  const Icon = result.icon

  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={() => onSelect(result)}
      onMouseEnter={onHover}
      className={cn(
        "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm",
        radius.md,
        patterns.focusRing,
        active
          ? "bg-primary-soft text-heading"
          : "text-body hover:bg-primary-soft/70"
      )}
    >
      {Icon && (
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center",
            radius.md,
            active ? "bg-primary/15 text-primary" : "bg-surface text-muted-foreground"
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="text-heading block truncate font-medium">{result.title}</span>
        {result.subtitle && (
          <span className="text-muted-foreground block truncate text-xs">{result.subtitle}</span>
        )}
      </span>

      {result.badge && (
        <Badge variant="secondary" className="hidden shrink-0 sm:inline-flex">
          {result.badge}
        </Badge>
      )}

      <ArrowRight
        className={cn(
          "size-4 shrink-0 opacity-0 transition-opacity",
          active && "text-primary opacity-100"
        )}
        aria-hidden
      />
    </button>
  )
}
