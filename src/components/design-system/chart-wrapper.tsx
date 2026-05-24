import { Panel } from "./panel"
import { cn } from "@/lib/utils"

interface ChartWrapperProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function ChartWrapper({ title, description, children, className }: ChartWrapperProps) {
  return (
    <Panel className={cn("flex flex-col gap-4", className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-heading text-lg font-semibold">{title}</h3>}
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
      )}
      {children}
    </Panel>
  )
}
