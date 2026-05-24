import type { IContact } from "@/types/IContact";
import type { Column } from "@/AppComponent/AppTable";
import { createElement } from "react";
import { ReadStatusBadge } from "@/components/design-system/status-badge";

export const columns: Column<IContact>[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Phone",
    render: (row) => row.phone || "-",
  },
  {
    key: "subject",
    label: "Subject",
    render: (row) => row.subject || "-",
  },
  {
    key: "message",
    label: "Message",
    render: (row) =>
      row.message && row.message.length > 40
        ? row.message.substring(0, 40) + "..."
        : row.message || "-",
  },
  {
    key: "isRead",
    label: "Status",
    render: (row) => createElement(ReadStatusBadge, { isRead: row.isRead }),
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (row) =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleDateString()
        : "-",
  },
];