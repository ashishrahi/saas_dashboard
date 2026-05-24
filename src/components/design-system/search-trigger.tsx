import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { patterns } from "@/lib/theme/patterns"
import { height } from "@/lib/theme/spacing"
import { radius } from "@/lib/theme/radius"
import { transition } from "@/lib/theme/transitions"

interface SearchTriggerProps {
  onClick: () => void
  className?: string
}

function KeyboardHint() {
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform)

  return (
    <kbd
      className={cn(
        "border-border bg-surface text-muted-foreground hidden items-center gap-0.5 border px-1.5 py-0.5 font-sans text-[10px] font-medium sm:inline-flex",
        radius.sm
      )}
    >
      {isMac ? "⌘" : "Ctrl"}
      <span className="text-[9px]">K</span>
    </kbd>
  )
}

export function SearchTrigger({ onClick, className }: SearchTriggerProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label="Open global search"
        className={cn(
          "border-input bg-surface text-muted-foreground hover:border-primary/40 hover:bg-primary-soft/40 hidden w-56 items-center gap-2 border px-3 text-sm md:flex",
          height.inputSm,
          radius.md,
          transition.colors,
          patterns.focusRing,
          className
        )}
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="flex-1 text-left">Search...</span>
        <KeyboardHint />
      </button>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onClick}
        className="md:hidden"
        aria-label="Open global search"
      >
        <Search className="size-5" />
      </Button>
    </>
  )
}
