import type { IPlan } from "@/types/IPlan";
import type { Column } from "@/AppComponent/AppTable";
import { createElement } from "react";
import { ActiveStatusBadge } from "@/components/design-system/status-badge";

export const columns: Column<IPlan>[] = [
  { key: "name", label: "Plan Name" },
  {
    key: "price",
    label: "Price",
    render: (row) => (row.isCustom ? "Custom" : `₹${row.price ?? "-"}`),
  },
  { key: "period", label: "Period" },
  {
    key: "popular",
    label: "Popular",
    render: (row) => (row.popular ? "Yes" : "No"),
  },
  {
    key: "isActive",
    label: "Status",
    render: (row) => createElement(ActiveStatusBadge, { isActive: row.isActive }),
  },
  {
    key: "features",
    label: "Features",
    render: (row) => (Array.isArray(row.features) ? row.features.join(", ") : "—"),
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