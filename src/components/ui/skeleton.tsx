import { cn } from "@/lib/utils"
import { radius } from "@/lib/theme/radius"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse bg-primary-soft/60", radius.md, className)}
      {...props}
    />
  )
}

export { Skeleton }
