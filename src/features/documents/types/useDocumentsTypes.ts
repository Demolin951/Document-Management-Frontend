import type { DocumentListItem } from "../../../shared/types/documentTypes";
 
export type UseDocumentsResult = {
  documents: DocumentListItem[];
  isLoadingDocuments: boolean;
  documentsErrorMessage: string | null;
  reloadDocuments: () => Promise<void>;
};