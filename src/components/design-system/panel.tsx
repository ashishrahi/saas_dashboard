import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { patterns } from "@/lib/theme/patterns"

const panelVariants = cva(patterns.panel, {
  variants: {
    padding: {
      none: "p-0",
      sm: patterns.panelPadding,
      lg: patterns.panelPaddingLg,
    },
  },
  defaultVariants: {
    padding: "sm",
  },
})

function Panel({
  className,
  padding,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof panelVariants>) {
  return (
    <div
      data-slot="panel"
      className={cn(panelVariants({ padding }), className)}
      {...props}
    />
  )
}

export { Panel, panelVariants }
