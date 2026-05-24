import { Link } from "react-router-dom"
import { ShieldX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Panel } from "@/components/design-system/panel"

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Panel className="max-w-md text-center">
        <div className="flex flex-col items-center gap-4 px-6 py-10">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ShieldX className="size-6" aria-hidden />
          </div>
          <div className="space-y-1">
            <h1 className="text-heading text-lg font-semibold">Access denied</h1>
            <p className="text-muted-foreground text-sm">
              You do not have permission to view this page. Contact an administrator if you
              believe this is a mistake.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/">Back to dashboard</Link>
          </Button>
        </div>
      </Panel>
    </div>
  )
}
