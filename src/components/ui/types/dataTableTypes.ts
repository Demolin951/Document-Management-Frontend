import type { ReactNode } from "react";
 
export type DataTableColumn = {
  key: string;
  label: string;
  width?: string;
  className?: string;
};
 
export type DataTableProps = {
  columns: DataTableColumn[];
  children?: ReactNode;
  footer?: ReactNode;
  emptyState?: ReactNode;
};
 
export type DataTableRowProps = {
  columns: DataTableColumn[];
  children: ReactNode;
};