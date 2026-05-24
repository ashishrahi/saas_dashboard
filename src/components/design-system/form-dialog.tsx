import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { patterns } from "@/lib/theme/patterns"

interface FormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  icon?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  className?: string
  size?: "md" | "lg" | "xl"
}

const sizeClasses = {
  md: "sm:max-w-xl",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  icon,
  children,
  footer,
  onSubmit,
  className,
  size = "md",
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          sizeClasses[size],
          "max-h-[85vh] overflow-y-auto",
          className
        )}
      >
        <DialogHeader className={patterns.dialogHeader}>
          <DialogTitle className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className={patterns.formGrid}>
          {children}
          {footer && (
            <DialogFooter className={cn(patterns.dialogFooter, "md:col-span-2")}>
              {footer}
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
