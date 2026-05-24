import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { patterns } from "@/lib/theme/patterns"
import { cn } from "@/lib/utils"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  destructive?: boolean
  icon?: React.ReactNode
  confirmLoading?: boolean
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Confirm action",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  destructive = false,
  icon,
  confirmLoading = false,
}: ConfirmDialogProps) {
  const handleOpenChange = (nextOpen: boolean) => {
    if (confirmLoading && !nextOpen) return
    onOpenChange(nextOpen)
  }

  const handleConfirm = () => {
    if (confirmLoading) return
    onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className={patterns.dialogHeader}>
          <DialogTitle className="flex items-center gap-2 text-lg">
            {icon}
            {title}
          </DialogTitle>
        </DialogHeader>

        {description && (
          <DialogDescription className="text-body py-2">{description}</DialogDescription>
        )}

        <DialogFooter className={cn(patterns.dialogFooter)}>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={confirmLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={confirmLoading}
          >
            {confirmLoading ? `${confirmLabel}…` : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
