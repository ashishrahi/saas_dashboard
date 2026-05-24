import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { StatCard } from "@/components/design-system/stat-card"
import { Badge } from "@/components/ui/badge"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 *:data-[slot=card]:from-primary-soft *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t">
      <StatCard
        label="Total Revenue"
        value="$1,250.00"
        action={
          <Badge variant="outline">
            <IconTrendingUp />
            +12.5%
          </Badge>
        }
        footer={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <IconTrendingUp className="size-4 shrink-0" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </>
        }
      />
      <StatCard
        label="New Customers"
        value="1,234"
        action={
          <Badge variant="outline">
            <IconTrendingDown />
            -20%
          </Badge>
        }
        footer={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Down 20% this period <IconTrendingDown className="size-4 shrink-0" />
            </div>
            <div className="text-muted-foreground">
              Acquisition needs attention
            </div>
          </>
        }
      />
      <StatCard
        label="Active Accounts"
        value="45,678"
        action={
          <Badge variant="outline">
            <IconTrendingUp />
            +12.5%
          </Badge>
        }
        footer={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Strong user retention <IconTrendingUp className="size-4 shrink-0" />
            </div>
            <div className="text-muted-foreground">Engagement exceed targets</div>
          </>
        }
      />
      <StatCard
        label="Growth Rate"
        value="4.5%"
        action={
          <Badge variant="outline">
            <IconTrendingUp />
            +4.5%
          </Badge>
        }
        footer={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Steady performance increase <IconTrendingUp className="size-4 shrink-0" />
            </div>
            <div className="text-muted-foreground">Meets growth projections</div>
          </>
        }
      />
    </div>
  )
}
