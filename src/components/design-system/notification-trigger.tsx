import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { radius } from "@/lib/theme/radius"
import { shadow } from "@/lib/theme/shadows"
import { cn } from "@/lib/utils"
import { NotificationPanel, useNotificationCenter } from "./notification-center"

interface NotificationTriggerProps {
  className?: string
}

export function NotificationTrigger({ className }: NotificationTriggerProps) {
  const isMobile = useIsMobile()
  const { open, setOpen, unreadCount } = useNotificationCenter()

  const handleViewAll = () => {
    setOpen(false)
  }

  const trigger = (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn("relative", className)}
      aria-label={
        unreadCount > 0
          ? `Notifications, ${unreadCount} unread`
          : "Notifications"
      }
    >
      <Bell className="size-5" aria-hidden />
      {unreadCount > 0 && (
        <span
          className={cn(
            "bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex min-w-[1.125rem] items-center justify-center px-1 text-[10px] font-semibold leading-none",
            radius.full
          )}
          aria-hidden
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Button>
  )

  const panel = (
    <NotificationPanel className="p-0" onViewAll={handleViewAll} />
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
          <SheetHeader className="sr-only">
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          {panel}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className={cn("w-[min(24rem,calc(100vw-2rem))] p-0", shadow.dropdown)}
      >
        {panel}
      </PopoverContent>
    </Popover>
  )
}
