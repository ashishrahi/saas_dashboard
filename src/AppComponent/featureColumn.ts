import type { IFeature } from "@/types/IFeatures";
import type { Column } from "@/AppComponent/AppTable";

export const columns: Column<IFeature>[] = [
    { key: "title", label: "Title" },
    { key: "name", label: "name" },
    { key: "description", label: "Description" },
   
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