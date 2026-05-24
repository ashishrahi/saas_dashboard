import React, { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterValues {
  name: string;
  email: string;
  role: string;
  status: string;
}

interface FilterPanelProps {
  onFilterChange?: (filters: FilterValues) => void;
}

const roles = ["Admin", "Editor", "User"];
const statusOptions = ["Active", "Inactive", "Pending"];

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const handleChange = (field: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    if (onFilterChange) onFilterChange(filters);
  };

  const resetFilters = () => {
    const empty: FilterValues = { name: "", email: "", role: "", status: "" };
    setFilters(empty);
    if (onFilterChange) onFilterChange(empty);
  };

  return (
    <div className="relative mb-4 w-full max-w-md">
      <div className="flex justify-end">
        <Button variant="secondary" size="sm" onClick={toggleFilter}>
          {showFilter ? <X className="size-4" /> : <Filter className="size-4" />}
          {showFilter ? "Close Filters" : "Filters"}
        </Button>
      </div>

      {showFilter && (
        <div className="bg-card border-border absolute right-0 z-50 mt-2 max-h-[400px] w-full overflow-y-auto rounded-[14px] border p-5 shadow-dropdown">
          <h4 className="text-heading mb-4 text-lg font-semibold">Filters</h4>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Name</Label>
              <Input
                placeholder="Enter name"
                value={filters.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>
              <Input
                placeholder="Enter email"
                value={filters.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Role</Label>
              <Select
                value={filters.role || "all"}
                onValueChange={(value) =>
                  handleChange("role", value === "all" ? "" : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Role</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Status</Label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) =>
                  handleChange("status", value === "all" ? "" : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Status</SelectItem>
                  {statusOptions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex justify-between gap-3">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={applyFilters}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
