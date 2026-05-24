import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatRelativeTime } from "@/lib/notifications"
import type { Notification, NotificationCategory } from "@/lib/notifications"
import { bg, border } from "@/lib/theme/colors"
import { patterns } from "@/lib/theme/patterns"
import { radius } from "@/lib/theme/radius"
import { transition } from "@/lib/theme/transitions"
import { text } from "@/lib/theme/typography"
import { cn } from "@/lib/utils"

const categoryBadgeVariant: Record<
  NotificationCategory,
  "info" | "secondary" | "success"
> = {
  system: "info",
  users: "secondary",
  business: "success",
}

const categoryLabels: Record<NotificationCategory, string> = {
  system: "System",
  users: "Users",
  business: "Business",
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead?: (id: string) => void
  className?: string
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  className,
}: NotificationItemProps) {
  const Icon = notification.icon ?? Bell

  const handleActivate = () => {
    if (!notification.read) {
      onMarkAsRead?.(notification.id)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleActivate()
    }
  }

  return (
    <button
      type="button"
      role="listitem"
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={`${notification.title}. ${notification.read ? "Read" : "Unread"}.`}
      className={cn(
        "group relative flex w-full gap-3 border-b px-4 py-3 text-left",
        border.divider,
        transition.colors,
        patterns.focusRing,
        !notification.read && bg.primarySoft,
        "hover:bg-surface-hover",
        className
      )}
    >
      <div
        className={cn(
          "text-primary flex size-9 shrink-0 items-center justify-center",
          radius.md,
          bg.primarySoft
        )}
      >
        <Icon className="size-4" aria-hidden />
      </div>

      <div className="min-w-0 flex-1 space-y-1.5 pr-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn(text.label, "truncate")}>{notification.title}</p>
          <Badge variant={categoryBadgeVariant[notification.category]} className="shrink-0">
            {categoryLabels[notification.category]}
          </Badge>
        </div>
        <p className={cn(text.body, "line-clamp-2")}>{notification.description}</p>
        <p className={text.caption}>{formatRelativeTime(notification.timestamp)}</p>
      </div>

      {!notification.read && (
        <span
          className="bg-primary absolute top-4 right-4 size-2 rounded-full"
          aria-hidden
        />
      )}
    </button>
  )
}
