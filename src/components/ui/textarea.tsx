import * as React from "react"

import { cn } from "@/lib/utils"
import { patterns } from "@/lib/theme/patterns"
import { radius } from "@/lib/theme/radius"
import { transition } from "@/lib/theme/transitions"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        patterns.input,
        patterns.inputFocus,
        patterns.focusRingInvalid,
        radius.md,
        "field-sizing-content min-h-24 py-3",
        transition.colors,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
