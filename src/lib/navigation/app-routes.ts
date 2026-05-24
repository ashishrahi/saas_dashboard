import type { LucideIcon } from "lucide-react"
import {
  Contact,
  CircleUser,
  Folder,
  FolderTree,
  Home,
  Settings,
  TagIcon,
  TypeIcon,
  Users,
} from "lucide-react"

export interface AppNavChildItem {
  title: string
  to: string
}

export interface AppNavItem {
  title: string
  to: string
  icon: LucideIcon
  /** Optional nested links — parent expands/collapses when present */
  children?: AppNavChildItem[]
  /** Extra terms for global search matching */
  keywords?: string[]
}

/** Single source for sidebar + command palette navigation */
export const APP_NAV_ITEMS: AppNavItem[] = [
  { title: "Home", to: "/", icon: Home, keywords: ["dashboard", "overview"] },
  { title: "Users", to: "/users", icon: Users, keywords: ["user", "accounts"] },
  { title: "Categories", to: "/categories", icon: Folder, keywords: ["category"] },
  {
    title: "Subcategories",
    to: "/subcategories",
    icon: FolderTree,
    keywords: ["subcategory", "sub category"],
  },
  { title: "Features", to: "/features", icon: TypeIcon, keywords: ["feature"] },
  { title: "Plans", to: "/plan", icon: TagIcon, keywords: ["plan", "pricing"] },
  { title: "Contact", to: "/contact", icon: Contact, keywords: ["messages", "inquiries"] },
  { title: "Profile", to: "/profile", icon: CircleUser, keywords: ["account", "me"] },
  { title: "Settings", to: "/settings", icon: Settings, keywords: ["preferences", "config"] },
]
