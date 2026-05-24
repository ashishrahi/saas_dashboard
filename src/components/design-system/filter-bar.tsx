import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormField } from "./form-field"
import { cn } from "@/lib/utils"

export interface FilterBarProps {
  search?: string
  onSearchChange?: (val: string) => void
  searchPlaceholder?: string
  status?: string
  onStatusChange?: (val: string) => void
  startDate?: string
  onStartDateChange?: (val: string) => void
  endDate?: string
  onEndDateChange?: (val: string) => void
  className?: string
}

const filterControlClass = "h-11 w-full"

export function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  status,
  onStatusChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-start gap-4", className)}>
      {onSearchChange && (
        <FormField label="Search" compact className="w-[220px] shrink-0">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={filterControlClass}
          />
        </FormField>
      )}
      {onStatusChange && (
        <FormField label="Status" compact className="w-[160px] shrink-0">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className={filterControlClass}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      )}
      {onStartDateChange && (
        <FormField label="Start Date" compact className="w-[170px] shrink-0">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className={filterControlClass}
          />
        </FormField>
      )}
      {onEndDateChange && (
        <FormField label="End Date" compact className="w-[170px] shrink-0">
          <Input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className={filterControlClass}
          />
        </FormField>
      )}
    </div>
  )
}
