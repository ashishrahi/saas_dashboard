import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ActionMenuProps<T> {
  row: T
  onView?: (row: T) => void
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
}

export function ActionMenu<T>({ row, onView, onEdit, onDelete }: ActionMenuProps<T>) {
  const actions = [onView, onEdit, onDelete].filter(Boolean)

  if (actions.length === 0) return null

  if (actions.length > 2) {
    return (
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-dropdown w-48">
            {onView && (
              <DropdownMenuItem onClick={() => onView(row)}>
                <Eye className="size-4" />
                View Details
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(row)}>
                <Edit className="size-4" />
                Edit
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                onClick={() => onDelete(row)}
                variant="destructive"
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-1">
      {onView && (
        <Button size="icon-sm" variant="ghost" onClick={() => onView(row)} title="View Details">
          <Eye className="text-info size-4" />
        </Button>
      )}
      {onEdit && (
        <Button size="icon-sm" variant="ghost" onClick={() => onEdit(row)} title="Edit">
          <Edit className="text-success size-4" />
        </Button>
      )}
      {onDelete && (
        <Button size="icon-sm" variant="ghost" onClick={() => onDelete(row)} title="Delete">
          <Trash2 className="text-destructive size-4" />
        </Button>
      )}
    </div>
  )
}
