import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { patterns } from "@/lib/theme/patterns"
import { radius } from "@/lib/theme/radius"
import { shadow } from "@/lib/theme/shadows"
import { transition } from "@/lib/theme/transitions"
import { height } from "@/lib/theme/spacing"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    radius.md,
    transition.default,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    patterns.focusRing,
    patterns.focusRingInvalid,
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          `bg-primary text-primary-foreground ${shadow.card} hover:bg-primary-hover active:bg-primary-active`,
        destructive:
          "bg-destructive text-primary-foreground hover:bg-destructive/90 focus-visible:ring-destructive/25",
        outline:
          `border border-border bg-surface text-heading ${shadow.card} hover:bg-surface-hover hover:border-primary/40`,
        secondary:
          `border border-border bg-transparent text-body ${shadow.card} hover:bg-surface-hover hover:text-heading`,
        ghost: "text-body hover:bg-surface-hover hover:text-heading",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: `${height.input} px-5 py-2 has-[>svg]:px-4`,
        sm: `${height.inputSm} ${radius.md} gap-1.5 px-4 has-[>svg]:px-3`,
        lg: `${height.inputLg} ${radius.lg} px-6 has-[>svg]:px-5`,
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
