import { Children } from "react";
import type { DataTableProps } from "./types/dataTableTypes";

function DataTable({ columns, children, emptyState, footer }: DataTableProps) {
  const hasRows = Children.count(children) > 0;

  const gridTemplateColumns = columns
    .map((column) => column.width ?? "minmax(0, 1fr)")
    .join(" ");

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className="grid border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-500"
        style={{ gridTemplateColumns }}
      >
        {columns.map((column) => (
          <div key={column.key} className={column.className}>
            {column.label}
          </div>
        ))}
      </div>
      {hasRows ? children : emptyState}

      {footer && (
        <div className="border-t border-slate-200 px-6 py-4">{footer}</div>
      )}
    </div>
  );
}

export default DataTable;
