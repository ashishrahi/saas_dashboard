import { Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { BreadcrumbSegment } from "@/lib/navigation/breadcrumbs"
import { cn } from "@/lib/utils"
import { spacing } from "@/lib/theme/spacing"
import { text } from "@/lib/theme/typography"

export interface AppBreadcrumbProps {
  items: BreadcrumbSegment[]
  className?: string
}

export function AppBreadcrumb({ items, className }: AppBreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className={cn(spacing[1.5], text.caption)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <span key={`${item.label}-${index}`} className="contents">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
