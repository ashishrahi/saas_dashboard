import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SearchTrigger } from "./search-trigger"
import { NotificationTrigger } from "./notification-trigger"
import { useGlobalSearchPalette } from "./global-search"
import { height } from "@/lib/theme/spacing"
import { zIndex } from "@/lib/theme/z-index"
import { cn } from "@/lib/utils"

interface NavbarProps {
  title?: string
  onToggleMobile?: () => void
  onToggleCollapse?: () => void
  searchPlaceholder?: string
  userInitials?: string
  onLogout?: () => void
  className?: string
}

export function Navbar({
  title = "Dashboard",
  onToggleMobile,
  onToggleCollapse,
  userInitials = "AR",
  onLogout,
  className,
}: NavbarProps) {
  const { openPalette } = useGlobalSearchPalette()

  return (
    <header
      className={cn(
        "bg-card border-border sticky top-0 flex shrink-0 items-center justify-between border-b px-4 md:px-6",
        height.header,
        zIndex.sticky,
        className
      )}
    >
      <div className="flex items-center gap-3">
        {onToggleMobile && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleMobile}
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        )}

        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleCollapse}
            className="hidden md:inline-flex"
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </Button>
        )}

        <h1 className="text-heading hidden text-lg font-semibold md:block">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <SearchTrigger onClick={openPalette} />

        <NotificationTrigger />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Account menu">
              <Avatar className="size-9">
                <AvatarFallback className="text-xs font-semibold">{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-dropdown">
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            {onLogout && <DropdownMenuItem onClick={onLogout}>Sign out</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
