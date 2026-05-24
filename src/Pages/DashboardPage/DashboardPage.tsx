import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive"
import { SectionCards } from "@/components/ui/section-cards"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-heading text-2xl font-semibold">Overview</h2>
        <p className="text-muted-foreground text-sm">Welcome back. Here is your dashboard summary.</p>
      </div>

      <SectionCards />
      <ChartAreaInteractive />
    </div>
  )
}
