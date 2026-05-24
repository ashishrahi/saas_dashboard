import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { isNavRouteActive } from "@/lib/navigation/is-nav-route-active"
import { patterns } from "@/lib/theme/patterns"
import { transition } from "@/lib/theme/transitions"
import { cn } from "@/lib/utils"

export interface SidebarNavChild {
  title: string
  to: string
}

interface SidebarItemProps {
  to: string
  icon: LucideIcon
  label: string
  collapsed?: boolean
  onNavigate?: () => void
  children?: SidebarNavChild[]
}

function NavChevron({
  expanded,
  interactive,
  active,
}: {
  expanded: boolean
  interactive: boolean
  active: boolean
}) {
  const Icon = interactive && expanded ? ChevronDown : ChevronRight

  return (
    <span className={patterns.navItemChevronSlot} aria-hidden>
      <Icon
        data-chevron
        className={cn(
          "size-4",
          transition.transform,
          active ? patterns.navItemChevronActive : patterns.navItemChevronInactive,
          interactive && !expanded && "group-hover/nav-item:text-sidebar-accent-foreground"
        )}
      />
    </span>
  )
}

function SidebarNavRow({
  icon: Icon,
  label,
  active,
  collapsed,
  chevronExpanded = false,
  chevronInteractive = false,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  icon: LucideIcon
  label: string
  active: boolean
  collapsed?: boolean
  chevronExpanded?: boolean
  chevronInteractive?: boolean
}) {
  return (
    <button
      type="button"
      className={cn(
        "group/nav-item",
        patterns.navItem,
        collapsed ? "justify-center px-2" : "",
        active ? patterns.navItemActive : patterns.navItemInactive,
        className
      )}
      {...props}
    >
      <Icon data-nav-icon className="size-4 shrink-0" />
      {!collapsed && (
        <>
          <span className={patterns.navItemLabel}>{label}</span>
          <NavChevron
            expanded={chevronExpanded}
            interactive={chevronInteractive}
            active={active}
          />
        </>
      )}
    </button>
  )
}

function SidebarLeafLink({
  to,
  icon: Icon,
  label,
  collapsed,
  active,
  onNavigate,
}: {
  to: string
  icon: LucideIcon
  label: string
  collapsed?: boolean
  active: boolean
  onNavigate?: () => void
}) {
  const link = (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onNavigate}
      className={cn(
        "group/nav-item",
        patterns.navItem,
        collapsed ? "justify-center px-2" : "",
        active ? patterns.navItemActive : patterns.navItemInactive
      )}
    >
      <Icon data-nav-icon className="size-4 shrink-0" />
      {!collapsed && (
        <>
          <span className={patterns.navItemLabel}>{label}</span>
          <NavChevron expanded={false} interactive={false} active={active} />
        </>
      )}
    </NavLink>
  )

  if (!collapsed) return link

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

export function SidebarItem({
  to,
  icon,
  label,
  collapsed,
  onNavigate,
  children,
}: SidebarItemProps) {
  const location = useLocation()
  const childItems = children ?? []
  const hasChildren = childItems.length > 0

  const isSelfActive = isNavRouteActive(location.pathname, to)
  const isChildActive = childItems.some((child) =>
    isNavRouteActive(location.pathname, child.to)
  )
  const isActive = isSelfActive || isChildActive

  const [open, setOpen] = useState(isChildActive)

  useEffect(() => {
    if (isChildActive) setOpen(true)
  }, [isChildActive, location.pathname])

  if (!hasChildren) {
    return (
      <SidebarLeafLink
        to={to}
        icon={icon}
        label={label}
        collapsed={collapsed}
        active={isSelfActive}
        onNavigate={onNavigate}
      />
    )
  }

  if (collapsed) {
    return (
      <SidebarLeafLink
        to={to}
        icon={icon}
        label={label}
        collapsed
        active={isActive}
        onNavigate={onNavigate}
      />
    )
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <SidebarNavRow
          icon={icon}
          label={label}
          active={isActive}
          chevronExpanded={open}
          chevronInteractive
          aria-expanded={open}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:hidden">
        <ul className={patterns.navSubList}>
          {childItems.map((child) => {
            const childActive = isNavRouteActive(location.pathname, child.to)

            return (
              <li key={child.to}>
                <NavLink
                  to={child.to}
                  end={child.to === "/"}
                  onClick={onNavigate}
                  className={cn(
                    patterns.navSubItem,
                    childActive ? patterns.navSubItemActive : patterns.navSubItemInactive
                  )}
                >
                  <span className="truncate">{child.title}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
