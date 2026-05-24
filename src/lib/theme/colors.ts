/** Semantic color tokens — use Tailwind classes mapped in index.css @theme */
export const colors = {
  primary: "text-primary",
  primaryFg: "text-primary-foreground",
  heading: "text-heading",
  body: "text-body",
  muted: "text-muted-foreground",
  disabled: "text-disabled",
  destructive: "text-destructive",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
} as const

export const bg = {
  background: "bg-background",
  surface: "bg-surface",
  surfaceHover: "bg-surface-hover",
  card: "bg-card",
  popover: "bg-popover",
  primary: "bg-primary",
  primarySoft: "bg-primary-soft",
  primaryLight: "bg-primary-light",
  muted: "bg-muted",
  accent: "bg-accent",
  destructive: "bg-destructive",
  sidebar: "bg-sidebar",
} as const

export const border = {
  default: "border-border",
  divider: "border-divider",
  input: "border-input",
  primary: "border-primary",
} as const
