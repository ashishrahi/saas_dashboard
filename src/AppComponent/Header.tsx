import { Navbar } from "@/components/design-system/navbar"
import { useBreadcrumbs } from "@/lib/navigation/use-breadcrumbs"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { AppDispatch } from "@/store/store"
import { logoutUser } from "@/store/AuthSlice"

export default function Header({
  onToggleMobile,
  onToggleCollapse,
}: {
  onToggleMobile: () => void
  onToggleCollapse: () => void
}) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const breadcrumbs = useBreadcrumbs()
  const title = breadcrumbs[breadcrumbs.length - 1]?.label ?? "Dashboard"

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate("/signin")
  }

  return (
    <Navbar
      title={title}
      onToggleMobile={onToggleMobile}
      onToggleCollapse={onToggleCollapse}
      onLogout={handleLogout}
    />
  )
}
