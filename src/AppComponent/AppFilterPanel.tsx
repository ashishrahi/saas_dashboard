import React, { useState } from "react";
import { Filter, X } from "lucide-react";

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
const status = ["Active", "Inactive", "Pending"];

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
    <div className="mb-4 relative w-full max-w-md">
      {/* Filter Button */}
      <div className="flex justify-end">
        <button
          onClick={toggleFilter}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          {showFilter ? <X size={18} /> : <Filter size={18} />}
          {showFilter ? "Close Filters" : "Filters"}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-5 z-50 overflow-y-auto max-h-[400px]">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Filters</h4>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={filters.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="text"
                placeholder="Enter email"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={filters.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Role</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={filters.role}
                onChange={(e) => handleChange("role", e.target.value)}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Status</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={filters.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="">Select Status</option>
                {status.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={resetFilters}
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
