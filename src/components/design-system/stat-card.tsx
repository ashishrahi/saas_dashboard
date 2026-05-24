import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: React.ReactNode
  footer?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function StatCard({
  label,
  value,
  footer,
  action,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("h-full gap-3 p-4", className)}>
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <CardDescription className="leading-none">{label}</CardDescription>
          {action}
        </div>
        <CardTitle className="text-2xl font-semibold leading-none tracking-tight tabular-nums">
          {value}
        </CardTitle>
        {footer ? (
          <div className="mt-auto flex flex-col gap-1 text-sm">{footer}</div>
        ) : null}
      </div>
    </Card>
  )
}
