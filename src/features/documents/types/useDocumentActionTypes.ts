import type { DocumentActionKey } from "./documentActionTypes";
import type { DocumentListItem } from "./documentTypes";
 
export type UseDocumentActionsResult = {
  documentActionErrorMessage: string | null;
  isDocumentActionLoading: boolean;
  handleDocumentAction: (
    actionKey: DocumentActionKey,
    document: DocumentListItem
  ) => Promise<void>;
};