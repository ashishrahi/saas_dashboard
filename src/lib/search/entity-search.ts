import { Folder, TagIcon, TypeIcon, Users } from "lucide-react"
import type { ICategory } from "@/types/ICategory"
import type { IFeature } from "@/types/IFeatures"
import type { IPlan } from "@/types/IPlan"
import type { IUser } from "@/types/IUser"
import type { SearchEntityType, SearchResult } from "./types"

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function matchesEntity(query: string, label: string | undefined): boolean {
  const q = normalize(query)
  if (!q) return false
  if (!label) return false
  return normalize(label).includes(q)
}

const ENTITY_ROUTES: Record<SearchEntityType, string> = {
  user: "/users",
  category: "/categories",
  feature: "/features",
  plan: "/plan",
}

const ENTITY_META: Record<
  SearchEntityType,
  { prefix: string; icon: typeof Users; badge: string }
> = {
  user: { prefix: "User", icon: Users, badge: "User" },
  category: { prefix: "Category", icon: Folder, badge: "Category" },
  feature: { prefix: "Feature", icon: TypeIcon, badge: "Feature" },
  plan: { prefix: "Plan", icon: TagIcon, badge: "Plan" },
}

function toEntityResult(
  entityType: SearchEntityType,
  id: string,
  label: string
): SearchResult {
  const meta = ENTITY_META[entityType]
  return {
    id: `${entityType}-${id}`,
    kind: "entity",
    title: label,
    subtitle: meta.prefix,
    href: ENTITY_ROUTES[entityType],
    icon: meta.icon,
    entityType,
    badge: meta.badge,
  }
}

export interface EntitySearchSource {
  users: IUser[]
  categories: ICategory[]
  features: IFeature[]
  plans: IPlan[]
}

export function getEntitySearchResults(
  query: string,
  source: EntitySearchSource
): SearchResult[] {
  const q = normalize(query)
  if (!q) return []

  const users = source.users
    .filter((u) => matchesEntity(query, u.name ?? u.username ?? u.email))
    .slice(0, 8)
    .map((u) => toEntityResult("user", u._id, u.name ?? u.username ?? "User"))

  const categories = source.categories
    .filter((c) => matchesEntity(query, c.name))
    .slice(0, 8)
    .map((c) => toEntityResult("category", c._id, c.name))

  const features = source.features
    .filter((f) => matchesEntity(query, f.title))
    .slice(0, 8)
    .map((f) => toEntityResult("feature", f._id, f.title ?? "Feature"))

  const plans = source.plans
    .filter((p) => matchesEntity(query, p.name))
    .slice(0, 8)
    .map((p) => toEntityResult("plan", p._id, p.name))

  return [...users, ...categories, ...features, ...plans]
}
