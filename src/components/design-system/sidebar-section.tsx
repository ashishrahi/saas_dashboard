import { cn } from "@/lib/utils"
import { text } from "@/lib/theme/typography"

interface SidebarSectionProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {title && !title.startsWith("__") && (
        <p className={cn(text.caption, "text-sidebar-icon px-3 py-2 uppercase")}>
          {title}
        </p>
      )}
      {children}
    </div>
  )
}
