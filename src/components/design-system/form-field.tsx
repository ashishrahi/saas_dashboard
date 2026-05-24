import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { patterns } from "@/lib/theme/patterns"

interface FormFieldProps {
  label?: React.ReactNode
  htmlFor?: string
  error?: string
  hint?: string
  required?: boolean
  compact?: boolean
  className?: string
  children: React.ReactNode
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  compact = false,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn(compact ? "flex flex-col gap-1.5" : "space-y-2", className)}>
      {label &&
        (compact ? (
          <span className="text-muted-foreground block h-4 shrink-0 text-xs leading-4 font-medium">
            {label}
          </span>
        ) : (
          <Label htmlFor={htmlFor}>
            {label}
            {required && <span className="text-destructive"> *</span>}
          </Label>
        ))}
      {children}
      {error && <p className={patterns.formError}>{error}</p>}
      {hint && !error && (
        <p className="text-muted-foreground text-xs">{hint}</p>
      )}
    </div>
  )
}
