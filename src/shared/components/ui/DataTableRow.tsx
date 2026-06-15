import type { DataTableRowProps } from "./types/dataTableTypes";

function DataTableRow({ columns, children }: DataTableRowProps) {
  const gridTemplateColumns = columns
    .map((column) => column.width ?? "minmax(0, 1fr)")
    .join(" ");

  return (
    <div
      className="grid items-center border-b border-slate-100 px-6 py-4 text-sm text-slate-700 last:border-b-0"
      style={{ gridTemplateColumns }}
    >
      {children}
    </div>
  );
}

export default DataTableRow;
