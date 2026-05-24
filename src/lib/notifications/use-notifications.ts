import { useCallback, useMemo, useState } from "react"
import { mockNotifications } from "./mock-data"
import type { Notification, NotificationCategory, NotificationGroup } from "./types"

const CATEGORY_LABELS: Record<NotificationCategory, string> = {
  system: "System",
  users: "Users",
  business: "Business",
}

const CATEGORY_ORDER: NotificationCategory[] = ["system", "users", "business"]

function groupNotifications(notifications: Notification[]): NotificationGroup[] {
  return CATEGORY_ORDER.map((category) => ({
    id: category,
    label: CATEGORY_LABELS[category],
    notifications: notifications
      .filter((item) => item.category === category)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
  })).filter((group) => group.notifications.length > 0)
}

export function useNotifications(initialNotifications = mockNotifications) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  )

  const groups = useMemo(() => groupNotifications(notifications), [notifications])

  const markAsRead = useCallback((id: string) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item))
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    groups,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
  }
}
