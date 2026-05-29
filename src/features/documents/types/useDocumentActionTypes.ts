import type { DocumentActionKey } from "./documentActionTypes";
import type { DocumentListItem } from "./documentTypes";

export type UseDocumentActionsResult = {
  documentActionErrorMessage: string | null;
  isDocumentActionLoading: boolean;

  selectedDocumentForAccess: DocumentListItem | null;
  closeManageAccessModal: () => void;

  selectedDocumentForVersionUpload: DocumentListItem | null;
  closeUploadVersionModal: () => void;

  selectedDocumentForDelete: DocumentListItem | null;
  closeDeleteDocumentModal: () => void;

  handleDocumentAction: (
    actionKey: DocumentActionKey,
    document: DocumentListItem,
  ) => Promise<void>;
};
