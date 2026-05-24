import { BellOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { text } from "@/lib/theme/typography"

interface NotificationEmptyStateProps {
  className?: string
}

export function NotificationEmptyState({ className }: NotificationEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-10 text-center",
        className
      )}
    >
      <div className="bg-primary-soft text-muted-foreground flex size-12 items-center justify-center rounded-full">
        <BellOff className="size-5" aria-hidden />
      </div>
      <div className="space-y-1">
        <p className={text.h4}>No notifications</p>
        <p className={text.caption}>
          You&apos;re all caught up. New alerts will appear here.
        </p>
      </div>
    </div>
  )
}
