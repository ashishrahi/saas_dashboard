import * as React from "react"

import { cn } from "@/lib/utils"
import { patterns } from "@/lib/theme/patterns"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        patterns.input,
        patterns.inputFocus,
        patterns.focusRingInvalid,
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  )
}

export { Input }
