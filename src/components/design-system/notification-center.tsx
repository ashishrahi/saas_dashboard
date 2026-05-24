import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useNotifications } from "@/lib/notifications"
import type { NotificationGroup } from "@/lib/notifications"
import { bg, border } from "@/lib/theme/colors"
import { text } from "@/lib/theme/typography"
import { cn } from "@/lib/utils"
import { NotificationEmptyState } from "./notification-empty-state"
import { NotificationItem } from "./notification-item"

interface NotificationCenterContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  groups: NotificationGroup[]
  unreadCount: number
  hasNotifications: boolean
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
}

const NotificationCenterContext = createContext<NotificationCenterContextValue | null>(
  null
)

export function useNotificationCenter() {
  const ctx = useContext(NotificationCenterContext)
  if (!ctx) {
    throw new Error("useNotificationCenter must be used within NotificationCenter")
  }
  return ctx
}

interface NotificationCenterProps {
  children: ReactNode
}

export function NotificationCenter({ children }: NotificationCenterProps) {
  const [open, setOpen] = useState(false)
  const { groups, unreadCount, markAsRead, markAllAsRead, clearAll, notifications } =
    useNotifications()

  const value = useMemo(
    () => ({
      open,
      setOpen,
      groups,
      unreadCount,
      hasNotifications: notifications.length > 0,
      markAsRead,
      markAllAsRead,
      clearAll,
    }),
    [open, groups, unreadCount, notifications.length, markAsRead, markAllAsRead, clearAll]
  )

  return (
    <NotificationCenterContext.Provider value={value}>
      {children}
    </NotificationCenterContext.Provider>
  )
}

interface NotificationPanelProps {
  className?: string
  onViewAll?: () => void
}

export function NotificationPanel({ className, onViewAll }: NotificationPanelProps) {
  const {
    groups,
    unreadCount,
    hasNotifications,
    markAsRead,
    markAllAsRead,
    clearAll,
  } = useNotificationCenter()

  return (
    <div
      className={cn("flex flex-col", className)}
      role="region"
      aria-label="Notifications panel"
    >
      <div
        className={cn(
          "flex items-start justify-between gap-3 border-b px-4 py-3",
          border.divider
        )}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className={text.h4}>Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="default" aria-label={`${unreadCount} unread`}>
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            )}
          </div>
          <p className={text.caption}>
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
              : "You're all caught up"}
          </p>
        </div>

        {hasNotifications && (
          <div className="flex shrink-0 flex-col items-end gap-1">
            {unreadCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground h-8 px-2 text-xs"
              onClick={clearAll}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      <ScrollArea className="max-h-[min(28rem,calc(100dvh-8rem))]">
        {hasNotifications ? (
          <div role="list" aria-label="Notification list">
            {groups.map((group, index) => (
              <section key={group.id} aria-label={`${group.label} notifications`}>
                {index > 0 && <Separator />}
                <div className={cn("px-4 py-2.5", bg.muted)}>
                  <p className={text.overline}>{group.label}</p>
                </div>
                {group.notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                  />
                ))}
              </section>
            ))}
          </div>
        ) : (
          <NotificationEmptyState />
        )}
      </ScrollArea>

      <div className={cn("border-t px-4 py-3", border.divider)}>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={onViewAll}
        >
          View all notifications
        </Button>
      </div>
    </div>
  )
}
