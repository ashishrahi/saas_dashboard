import {
  CreditCard,
  Download,
  HardDrive,
  KeyRound,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  UserPlus,
} from "lucide-react"
import type { Notification } from "./types"

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000)
const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000)

export const mockNotifications: Notification[] = [
  {
    id: "sys-backup",
    category: "system",
    title: "Backup completed",
    description: "Daily database backup finished successfully.",
    timestamp: hoursAgo(1),
    read: false,
    icon: HardDrive,
  },
  {
    id: "sys-security",
    category: "system",
    title: "Security alert",
    description: "Unusual login attempt detected from a new device.",
    timestamp: hoursAgo(3),
    read: false,
    icon: ShieldAlert,
  },
  {
    id: "sys-update",
    category: "system",
    title: "New update available",
    description: "Version 2.4.0 is ready to install with performance improvements.",
    timestamp: daysAgo(1),
    read: true,
    icon: Download,
  },
  {
    id: "user-registered",
    category: "users",
    title: "New user registered",
    description: "Sarah Chen created an account and is pending verification.",
    timestamp: hoursAgo(2),
    read: false,
    icon: UserPlus,
  },
  {
    id: "user-reset",
    category: "users",
    title: "Password reset requested",
    description: "James Wilson requested a password reset link.",
    timestamp: hoursAgo(5),
    read: true,
    icon: KeyRound,
  },
  {
    id: "biz-contact",
    category: "business",
    title: "New contact inquiry",
    description: "Acme Corp submitted a demo request via the contact form.",
    timestamp: hoursAgo(4),
    read: false,
    icon: MessageSquare,
  },
  {
    id: "biz-plan",
    category: "business",
    title: "Plan purchased",
    description: "TechStart Inc upgraded to the Enterprise plan.",
    timestamp: daysAgo(1),
    read: false,
    icon: CreditCard,
  },
  {
    id: "biz-feature",
    category: "business",
    title: "Feature updated",
    description: "Advanced analytics module was enabled for Pro accounts.",
    timestamp: daysAgo(2),
    read: true,
    icon: Sparkles,
  },
]
