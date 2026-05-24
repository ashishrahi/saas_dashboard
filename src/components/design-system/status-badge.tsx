import { Badge, type badgeVariants } from "@/components/ui/badge"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { fontFamily } from "@/lib/theme/typography"

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>
export type StatusBadgeSize = "sm" | "md"

/** Canonical status keys mapped to semantic badge variants */
export const statusVariantMap: Record<string, BadgeVariant> = {
  active: "success",
  success: "success",
  enabled: "success",
  inactive: "secondary",
  pending: "warning",
  disabled: "destructive",
  failed: "destructive",
  rejected: "destructive",
  error: "destructive",
  draft: "info",
  archived: "archived",
  read: "secondary",
  unread: "info",
}

const dotColorMap: Record<BadgeVariant, string> = {
  default: "bg-primary",
  secondary: "bg-muted-foreground",
  destructive: "bg-destructive",
  outline: "bg-muted-foreground",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  archived: "bg-heading/60",
}

export function normalizeStatusKey(status: string): string {
  return status.trim().toLowerCase().replace(/[\s_-]+/g, "")
}

export function formatStatusLabel(status: string): string {
  const trimmed = status.trim()
  if (!trimmed) return "Unknown"

  return trimmed
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export function resolveStatusVariant(
  status: string,
  override?: BadgeVariant
): BadgeVariant {
  if (override) return override
  const normalized = normalizeStatusKey(status)
  return statusVariantMap[normalized] ?? "outline"
}

interface StatusBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "variant"> {
  status: string
  size?: StatusBadgeSize
  compact?: boolean
  showDot?: boolean
  variant?: BadgeVariant
}

export function StatusBadge({
  status,
  size = "md",
  compact = false,
  showDot = false,
  variant,
  className,
  ...props
}: StatusBadgeProps) {
  const resolvedVariant = resolveStatusVariant(status, variant)
  const label = formatStatusLabel(status)

  return (
    <Badge
      variant={resolvedVariant}
      className={cn(
        fontFamily,
        "font-medium tracking-normal normal-case",
        size === "sm"
          ? compact
            ? "h-5 px-2 py-0 text-[10px] leading-none"
            : "h-5 px-2 py-0 text-xs leading-none"
          : compact
            ? "h-6 px-2.5 py-0 text-xs leading-none"
            : "h-6 px-2.5 py-0.5 text-xs leading-none",
        showDot && "gap-1.5",
        className
      )}
      {...props}
    >
      {showDot && (
        <span
          className={cn("size-1.5 shrink-0 rounded-full", dotColorMap[resolvedVariant])}
          aria-hidden
        />
      )}
      {label}
    </Badge>
  )
}

interface ActiveStatusBadgeProps extends Omit<StatusBadgeProps, "status"> {
  isActive: boolean
}

export function ActiveStatusBadge({ isActive, ...props }: ActiveStatusBadgeProps) {
  return <StatusBadge status={isActive ? "Active" : "Inactive"} {...props} />
}

interface ReadStatusBadgeProps extends Omit<StatusBadgeProps, "status"> {
  isRead: boolean
}

export function ReadStatusBadge({ isRead, ...props }: ReadStatusBadgeProps) {
  return <StatusBadge status={isRead ? "Read" : "Unread"} {...props} />
}
