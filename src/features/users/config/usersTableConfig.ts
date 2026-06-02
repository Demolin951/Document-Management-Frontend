import type { DataTableColumn } from "../../../components/ui/types/dataTableTypes";

export const usersTableColumns: DataTableColumn[] = [
  {
    key: "user",
    label: "User",
    width: "minmax(0, 1fr)",
  },
  {
    key: "actions",
    label: "Actions",
    width: "160px",
    className: "text-right",
  },
];
