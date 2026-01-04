import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Inbox } from "lucide-react";

// Column interface
export interface Column<RowType> {
  key: keyof RowType;
  label: string;
  render?: (row: RowType) => React.ReactNode;
  className?: string;
}

export interface GlobalTableProps<RowType extends { _id: string }> {
  columns: Column<RowType>[];
  data?: RowType[];
  onEdit?: (row: RowType) => void;
  onDelete?: (row: RowType) => void;
  onView?: (row: RowType) => void;
  title?: string;
  emptyMessage?: string;
  loading?: boolean;
}

export function AppTable<RowType extends { _id: string }>({
  columns,
  data = [],
  onEdit,
  onDelete,
  onView,
  title,
  emptyMessage = "No data available",
  loading = false,
}: GlobalTableProps<RowType>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hasActions = onEdit || onDelete || onView;
  const actionCount = [onEdit, onDelete, onView].filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm w-full">
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>
      )}

      <div className="overflow-hidden rounded-xl">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
              {columns?.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={`px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[150px] ${col.className || ""}`}
                >
                  {col.label}
                </TableHead>
              ))}
              {hasActions && (
                <TableHead className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 text-right w-20">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                  {columns.map((col, colIndex) => (
                    <TableCell key={`skeleton-cell-${colIndex}`} className="px-4 py-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell className="px-4 py-3">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length + (hasActions ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Inbox className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    <div className="text-sm font-medium">{emptyMessage}</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row) => (
                <TableRow
                  key={row._id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={`px-4 py-3 text-sm text-gray-900 dark:text-gray-100 truncate max-w-[150px] ${col.className || ""}`}
                    >
                      {col.render ? (
                        col.render(row)
                      ) : (
                        <span className="truncate">
                          {String(row?.[col.key] ?? "")}
                        </span>
                      )}
                    </TableCell>
                  ))}

                  {hasActions && (
                    <TableCell className="px-4 py-3">
                      {actionCount > 2 ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {onView && (
                              <DropdownMenuItem
                                onClick={() => onView(row)}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                            )}
                            {onEdit && (
                              <DropdownMenuItem
                                onClick={() => onEdit(row)}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <Edit className="h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <DropdownMenuItem
                                onClick={() => onDelete(row)}
                                className="flex items-center space-x-2 cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <div className="flex justify-end space-x-1">
                          {onView && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onView(row)}
                              title="View Details"
                              className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </Button>
                          )}
                          {onEdit && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onEdit(row)}
                              title="Edit"
                              className="h-8 w-8 p-0 hover:bg-green-50 dark:hover:bg-green-900/20"
                            >
                              <Edit className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onDelete(row)}
                              title="Delete"
                              className="h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}