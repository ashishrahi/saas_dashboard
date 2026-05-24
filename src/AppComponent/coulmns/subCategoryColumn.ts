import type { ISubCategory } from "@/types/ISubCategory";
import type { Column } from "@/AppComponent/AppTable";
import { createElement } from "react";
import { ActiveStatusBadge } from "@/components/design-system/status-badge";

export const columns: Column<ISubCategory>[] = [
  { key: "name", label: "Subcategory Name" },
  { key: "description", label: "Description" },
  {
    key: "categoryId",
    label: "Category",
    render: (row) =>
      typeof row.categoryId === "string"
        ? row.categoryId
        : row.categoryId?.name ?? "",
  },
  {
    key: "isActive",
    label: "Status",
    render: (row) => createElement(ActiveStatusBadge, { isActive: row.isActive }),
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
  {
    key: "updatedAt",
    label: "Updated At",
    render: (row) => new Date(row.updatedAt).toLocaleDateString(),
  },
];

