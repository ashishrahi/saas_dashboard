import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "./empty-state"
import { QueryErrorState } from "./query-error-state"
import { ActionMenu } from "./action-menu"
import { Panel } from "./panel"
import { patterns } from "@/lib/theme/patterns"
import { radius } from "@/lib/theme/radius"
import { cn } from "@/lib/utils"

export interface Column<RowType> {
  key: keyof RowType
  label: string
  render?: (row: RowType) => React.ReactNode
  className?: string
}

export interface DataTableProps<RowType extends { _id: string }> {
  columns: Column<RowType>[]
  data?: RowType[]
  onEdit?: (row: RowType) => void
  onDelete?: (row: RowType) => void
  onView?: (row: RowType) => void
  title?: string
  emptyMessage?: string
  emptyDescription?: string
  loading?: boolean
  error?: unknown
  onRetry?: () => void
  isRetrying?: boolean
  maxHeight?: string
  className?: string
}

const ACTIONS_COLUMN_CLASS =
  "w-[72px] min-w-[72px] max-w-[72px] px-3 text-center"

export function DataTable<RowType extends { _id: string }>({
  columns,
  data = [],
  onEdit,
  onDelete,
  onView,
  title,
  emptyMessage = "No data available",
  emptyDescription,
  loading = false,
  error,
  onRetry,
  isRetrying = false,
  maxHeight = "480px",
  className,
}: DataTableProps<RowType>) {
  const hasActions = onEdit || onDelete || onView
  const showTableError = Boolean(error) && !loading

  return (
    <Panel padding="none" className={cn("w-full overflow-hidden", className)}>
      {title && (
        <div className="border-divider border-b px-4 py-4 sm:px-6">
          <h2 className="text-heading text-lg font-semibold">{title}</h2>
        </div>
      )}

      {showTableError ? (
        <QueryErrorState
          error={error}
          onRetry={onRetry}
          isRetrying={isRetrying}
          className="min-h-[280px] sm:min-h-[320px]"
        />
      ) : (
      <div className={cn("overflow-auto", radius.lg)} style={{ maxHeight }}>
        <Table className="w-full">
          <TableHeader>
            <TableRow className={patterns.tableHeaderRow}>
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={cn("max-w-[150px] truncate", col.className)}
                >
                  {col.label}
                </TableHead>
              ))}
              {hasActions && (
                <TableHead className={ACTIONS_COLUMN_CLASS}>Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {columns.map((_, colIndex) => (
                      <TableCell key={`skeleton-cell-${colIndex}`}>
                        <Skeleton className="h-4" />
                      </TableCell>
                    ))}
                    {hasActions && (
                      <TableCell className={ACTIONS_COLUMN_CLASS}>
                        <Skeleton className="mx-auto h-8 w-8" />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              : data.length === 0
                ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={columns.length + (hasActions ? 1 : 0)}>
                      <EmptyState
                        title={emptyMessage}
                        description={emptyDescription}
                      />
                    </TableCell>
                  </TableRow>
                )
                : data.map((row) => (
                    <TableRow key={row._id}>
                      {columns.map((col) => (
                        <TableCell
                          key={String(col.key)}
                          className={cn("max-w-[150px] truncate", col.className)}
                        >
                          {col.render ? (
                            col.render(row)
                          ) : (
                            <span className="truncate">{String(row[col.key] ?? "")}</span>
                          )}
                        </TableCell>
                      ))}

                      {hasActions && (
                        <TableCell className={ACTIONS_COLUMN_CLASS}>
                          <ActionMenu
                            row={row}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </div>
      )}
    </Panel>
  )
}
