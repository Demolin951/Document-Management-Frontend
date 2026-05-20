import type { DataTableColumn } from "../../components/ui/DataTable";

export const documentTableColumns: DataTableColumn[] = [
    {
        key: "name",
        label: "Name",
        width: "2fr",
    },
    {
        key: "owner",
        label: "Owner",
        width: "1fr",
    },
    {
        key: "role",
        label: "Your Role",
        width: "1fr",
    },
    {
        key: "createdAt",
        label: "Created At",
        width: "1.3fr",
    },
    {
        key: "actions",
        label: "Actions",
        width: "1fr",
        className: "text-right",
    }
];