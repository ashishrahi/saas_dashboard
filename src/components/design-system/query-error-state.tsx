import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getApiErrorMessage, isNetworkError } from "@/utilities/apiError"
import { cn } from "@/lib/utils"

interface QueryErrorStateProps {
  error?: unknown
  title?: string
  onRetry?: () => void
  isRetrying?: boolean
  className?: string
}

export function QueryErrorState({
  error,
  title = "Unable to load data",
  onRetry,
  isRetrying = false,
  className,
}: QueryErrorStateProps) {
  const message = getApiErrorMessage(error)
  const description = isNetworkError(error)
    ? "Check your connection and try again."
    : "The request failed. You can retry or refresh the page."

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-4 py-10 text-center sm:px-6 sm:py-12",
        className
      )}
      role="alert"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-6" aria-hidden />
      </div>
      <div className="w-full max-w-md space-y-1">
        <p className="text-heading text-sm font-medium">{title}</p>
        <p className="text-muted-foreground break-words text-sm">{message}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      {onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full max-w-xs sm:w-auto"
          onClick={() => onRetry()}
          disabled={isRetrying}
        >
          <RefreshCw
            className={cn("mr-2 size-4", isRetrying && "animate-spin")}
            aria-hidden
          />
          {isRetrying ? "Retrying…" : "Try again"}
        </Button>
      )}
    </div>
  )
}
