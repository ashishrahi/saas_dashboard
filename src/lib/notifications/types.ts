import type { LucideIcon } from "lucide-react"

export type NotificationCategory = "system" | "users" | "business"

export interface Notification {
  id: string
  category: NotificationCategory
  title: string
  description: string
  timestamp: Date
  read: boolean
  icon?: LucideIcon
}

export interface NotificationGroup {
  id: NotificationCategory
  label: string
  notifications: Notification[]
}

/** Contract for a future backend-powered notification provider */
export interface NotificationProvider {
  fetchNotifications(signal?: AbortSignal): Promise<Notification[]>
  markAsRead(id: string): Promise<void>
  markAllAsRead(): Promise<void>
  clearAll(): Promise<void>
}
