import type { ICategory } from "@/types/ICategory";
import type { Column } from "@/AppComponent/AppTable";
import { createElement } from "react";
import { ActiveStatusBadge } from "@/components/design-system/status-badge";

export const columns: Column<ICategory>[] = [
  { key: "name", label: "Category Name" },
  { key: "description", label: "Description" },
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

