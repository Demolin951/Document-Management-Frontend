import type { DocumentActionKey } from "./documentActionTypes";
import type { DocumentListItem } from "../../../shared/types/documentTypes";

export type DocumentsTableProps = {
  username: string | undefined;
};

export type DocumentTableRowProps = {
  document: DocumentListItem;
  onDocumentAction: (
    actionKey: DocumentActionKey,
    document: DocumentListItem,
  ) => void;
  isDocumentActionLoading: boolean;
};

export type DocumentsTableFooterProps = {
  totalCount: number;
};
