import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

export interface AppPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

type PageEntry = number | "ellipsis-start" | "ellipsis-end"

function buildPageEntries(currentPage: number, totalPages: number): PageEntry[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set<number>([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ])

  const sorted = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b)
  const entries: PageEntry[] = []

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index]
    const previous = sorted[index - 1]

    if (previous !== undefined && page - previous > 1) {
      entries.push(previous === 1 ? "ellipsis-start" : "ellipsis-end")
    }

    entries.push(page)
  }

  return entries
}

export function AppPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: AppPaginationProps) {
  if (totalPages <= 1) return null

  const entries = buildPageEntries(currentPage, totalPages)

  return (
    <Pagination className={cn("justify-end", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {entries.map((entry, index) => {
          if (entry === "ellipsis-start" || entry === "ellipsis-end") {
            return (
              <PaginationItem key={`${entry}-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={entry}>
              <PaginationLink
                isActive={currentPage === entry}
                onClick={() => onPageChange(entry)}
                aria-label={`Go to page ${entry}`}
              >
                {entry}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
