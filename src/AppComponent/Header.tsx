import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { AppDispatch } from "@/store/store"
import { logout } from "@/store/AuthSlice"

export default function Header({
  onToggleMobile,
  onToggleCollapse,
}: {
  onToggleMobile: () => void
  onToggleCollapse: () => void
}) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())     
    navigate("/signin")   
  }

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMobile}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="hidden md:flex"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold hidden md:flex">Dashboard</h1>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        {/* Search bar */}
        <div className="hidden sm:flex items-center border rounded-md px-2 py-1 w-72">
          <input
            placeholder="Search..."
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 h-auto">
              <Avatar>
                <span className="rounded-full bg-slate-200 inline-flex items-center justify-center w-8 h-8">
                  AR
                </span>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
