import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductFilterProps {
  filterText: string;
  setFilterText: (val: string) => void;
  searchText?: string;
}

export const AppProductFilter: React.FC<ProductFilterProps> = ({ filterText, setFilterText, searchText }) => {
  return (
    <div className="mb-4">
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          id="product-search"
          className="pl-10" // padding-left to avoid icon overlap
          placeholder={`Search by ${searchText || "name"}...`}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
    </div>
  );
};
