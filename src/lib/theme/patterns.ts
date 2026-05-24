import { padding } from "./spacing"
import { radius } from "./radius"
import { shadow } from "./shadows"
import { transition } from "./transitions"
import { height } from "./spacing"

/** Shared class patterns for shadcn + design-system components */
export const patterns = {
  /** White/cream elevated surface (cards, panels, tables) */
  panel: `bg-card border-border ${radius.lg} border ${shadow.card}`,

  panelPadding: "p-5",
  panelPaddingLg: "p-6",

  /** Interactive overlay for modals/drawers */
  overlay: "bg-overlay/50",

  /** Standard focus ring */
  focusRing:
    "outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring",

  focusRingInvalid:
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",

  /** Form controls */
  input: [
    `border-input ${height.input} w-full min-w-0 ${radius.md} border bg-surface`,
    padding.inputX,
    padding.inputY,
    "text-sm text-heading shadow-card",
    transition.colors,
    "placeholder:text-muted-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-disabled disabled:opacity-60",
    "selection:bg-primary selection:text-primary-foreground",
  ].join(" "),

  inputFocus: "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring",

  /** Dialog structure */
  dialogHeader: "border-divider border-b pb-4",
  dialogFooter: "border-divider flex justify-end gap-3 border-t pt-4",
  formGrid: "grid grid-cols-1 gap-4 py-4 md:grid-cols-2",
  formError: "text-destructive text-xs",

  /** Table */
  tableHeaderRow: "bg-primary-soft/60 hover:bg-primary-soft/60 border-0",

  /** Sidebar nav — collapsible enterprise row */
  navItem: [
    `${radius.md} flex h-10 w-full items-center gap-3 border-l-2 px-3 text-sm font-medium`,
    transition.colors,
  ].join(" "),
  navItemActive:
    "border-sidebar-primary bg-sidebar-primary/15 text-sidebar-primary [&_[data-nav-icon]]:text-sidebar-primary",
  navItemInactive:
    "border-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&_[data-nav-icon]]:text-sidebar-icon",
  navItemLabel: "min-w-0 flex-1 truncate text-left",
  navItemChevronSlot: "ml-auto flex size-4 shrink-0 items-center justify-center",
  navItemChevronActive: "text-sidebar-primary",
  navItemChevronInactive: "text-sidebar-icon/70",
  navSubList:
    "border-sidebar-border mt-0.5 ml-3.5 flex flex-col gap-0.5 border-l py-0.5 pl-3",
  navSubItem: [
    `${radius.md} flex h-9 w-full items-center border-l-2 px-3 text-sm font-medium`,
    transition.colors,
  ].join(" "),
  navSubItemActive: "border-sidebar-primary text-sidebar-primary",
  navSubItemInactive:
    "border-transparent text-sidebar-icon hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
} as const
