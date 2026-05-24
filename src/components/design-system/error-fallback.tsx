import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Panel } from "./panel"

interface ErrorFallbackProps {
  onReset?: () => void
}

export function ErrorFallback({ onReset }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-6 sm:p-6">
      <Panel className="w-full max-w-md text-center">
        <div className="flex flex-col items-center gap-4 px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" aria-hidden />
          </div>
          <div className="space-y-1">
            <h1 className="text-heading text-lg font-semibold">
              Something went wrong
            </h1>
            <p className="text-muted-foreground text-sm">
              An unexpected error occurred. Try again or return to the dashboard.
            </p>
          </div>
          {onReset && (
            <Button
              type="button"
              variant="outline"
              className="w-full max-w-xs sm:w-auto"
              onClick={onReset}
            >
              <RefreshCw className="mr-2 size-4" aria-hidden />
              Try again
            </Button>
          )}
        </div>
      </Panel>
    </div>
  )
}
