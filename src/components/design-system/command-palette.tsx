import { useCallback, useEffect, useId, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { SearchResultItem } from "./search-result-item"
import { useGlobalSearch } from "@/lib/search/use-global-search"
import { useGlobalSearchData } from "@/lib/search/use-global-search-data"
import type { SearchResult } from "@/lib/search/types"
import { cn } from "@/lib/utils"
import { radius } from "@/lib/theme/radius"

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const listboxId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)

  const { source, isLoading } = useGlobalSearchData(open)
  const { groups, flatResults } = useGlobalSearch(query, source)

  const resetState = useCallback(() => {
    setQuery("")
    setActiveIndex(0)
  }, [])

  useEffect(() => {
    if (!open) {
      resetState()
      return
    }
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(timer)
  }, [open, resetState])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, flatResults.length])

  const handleSelect = useCallback(
    (result: SearchResult) => {
      onOpenChange(false)
      navigate(result.href)
    },
    [navigate, onOpenChange]
  )

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((i) => (flatResults.length ? (i + 1) % flatResults.length : 0))
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((i) =>
        flatResults.length ? (i - 1 + flatResults.length) % flatResults.length : 0
      )
      return
    }

    if (event.key === "Enter" && flatResults[activeIndex]) {
      event.preventDefault()
      handleSelect(flatResults[activeIndex])
    }
  }

  let runningIndex = -1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "gap-0 overflow-hidden p-0 sm:max-w-xl",
          radius.xl
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Global search</DialogTitle>
          <DialogDescription>
            Search pages and records across the admin panel
          </DialogDescription>
        </DialogHeader>

        <div className="border-divider flex items-center gap-3 border-b px-4 py-3">
          <Search className="text-primary size-5 shrink-0" aria-hidden />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, users, plans..."
            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-expanded={open}
            role="combobox"
          />
          {isLoading && (
            <Loader2 className="text-muted-foreground size-4 shrink-0 animate-spin" aria-hidden />
          )}
        </div>

        <ScrollArea className="max-h-[min(60vh,420px)]">
          <div
            id={listboxId}
            role="listbox"
            aria-label="Search results"
            className="p-2"
          >
            {flatResults.length === 0 && !isLoading && (
              <div className="text-muted-foreground px-4 py-10 text-center text-sm">
                {query.trim()
                  ? "No results found. Try a page name or record title."
                  : "Type to search navigation and records, or browse pages below."}
              </div>
            )}

            {groups.map((group, groupIndex) => (
              <div key={group.id} className="mb-1">
                {groupIndex > 0 && <Separator className="my-2" />}
                <p className="text-muted-foreground px-3 py-2 text-xs font-semibold tracking-wide uppercase">
                  {group.label}
                </p>
                <ul className="space-y-0.5" role="presentation">
                  {group.results.map((result) => {
                    runningIndex += 1
                    const itemIndex = runningIndex
                    return (
                      <li key={result.id} role="presentation">
                        <SearchResultItem
                          result={result}
                          active={itemIndex === activeIndex}
                          onSelect={handleSelect}
                          onHover={() => setActiveIndex(itemIndex)}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-divider text-muted-foreground flex flex-wrap items-center justify-between gap-3 border-t px-4 py-2.5 text-xs">
          <span className="flex items-center gap-2">
            <kbd className={cn("border-border bg-surface border px-1.5 py-0.5", radius.sm)}>
              ↑↓
            </kbd>
            navigate
          </span>
          <span className="flex items-center gap-2">
            <kbd className={cn("border-border bg-surface border px-1.5 py-0.5", radius.sm)}>
              ↵
            </kbd>
            open
          </span>
          <span className="flex items-center gap-2">
            <kbd className={cn("border-border bg-surface border px-1.5 py-0.5", radius.sm)}>
              esc
            </kbd>
            close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
