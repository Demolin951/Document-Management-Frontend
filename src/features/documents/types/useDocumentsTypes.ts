import type { DocumentListItem } from "./documentTypes";
 
export type UseDocumentsResult = {
  documents: DocumentListItem[];
  isLoadingDocuments: boolean;
  documentsErrorMessage: string | null;
  reloadDocuments: () => Promise<void>;
};