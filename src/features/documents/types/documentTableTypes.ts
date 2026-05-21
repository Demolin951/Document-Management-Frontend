import type { DocumentListItem } from "./documentTypes";

export type DocumentsTableProps = {
  username: string | undefined;
};

export type DocumentTableRowProps = {
  document: DocumentListItem;
};

export type DocumentsTableFooterProps = {
  totalCount: number;
};