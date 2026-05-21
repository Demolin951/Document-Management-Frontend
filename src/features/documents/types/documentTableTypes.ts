import type { DocumentActionKey } from "./documentActionTypes";
import type { DocumentListItem } from "./documentTypes";
 
export type DocumentTableProps = {
  username: string | undefined;
};
 
export type DocumentTableRowProps = {
  document: DocumentListItem;
  onDocumentAction: (
    actionKey: DocumentActionKey,
    document: DocumentListItem
  ) => void;
  isDocumentActionLoading: boolean;
};
 
export type DocumentsTableFooterProps = {
  totalCount: number;
};