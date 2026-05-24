/**
 * @deprecated Use `TablePaginationBar` from `@/components/design-system` instead.
 */
import { Panel } from "@/components/design-system/panel"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface AppPageSizeSelectorProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  options?: number[];
  className?: string;
}

/** @deprecated Use TablePaginationBar from @/components/design-system */
export const AppPageSizeSelector = ({
  pageSize,
  setPageSize,
  setCurrentPage,
  options = [5, 10, 20, 50],
  className,
}: AppPageSizeSelectorProps) => {
  return (
    <Panel className={cn("flex w-fit items-center gap-3", className)} padding="sm">
      <span className="text-muted-foreground text-sm">Rows per page</span>
      <Select
        value={String(pageSize)}
        onValueChange={(val) => {
          setPageSize(Number(val));
          setCurrentPage(1);
        }}
      >
        <SelectTrigger className="w-[80px]" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={String(opt)}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Panel>
  );
};

/** @deprecated Use TablePaginationBar from @/components/design-system */
export const AppPageSizeSelectorComponent = AppPageSizeSelector;
