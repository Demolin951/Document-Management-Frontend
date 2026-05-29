import type { DocumentListItem } from "../../documents/types/documentTypes";
 
export type DocumentVersionListItem = {
  id: number;
  documentId: number;
  versionNumber: number;
  uploadedBy: string;
  uploadedAtUtc: string;
};
 
export type VersionDocumentRow = DocumentListItem;
 
export type VersionHistoryModalProps = {
  isOpen: boolean;
  document: VersionDocumentRow | null;
  versions: DocumentVersionListItem[];
  onClose: () => void;
  onDownloadVersion: (version: DocumentVersionListItem) => void;
};
 
export type AvailableDocumentsVersionTableProps = {
  documents: VersionDocumentRow[];
  onDownloadLatest: (document: VersionDocumentRow) => void;
  onOpenVersionHistory: (document: VersionDocumentRow) => void;
};
 
export type VersionDocumentRowProps = {
  document: VersionDocumentRow;
  onDownloadLatest: (document: VersionDocumentRow) => void;
  onOpenVersionHistory: (document: VersionDocumentRow) => void;
};
 
export type VersionHistoryRowProps = {
  version: DocumentVersionListItem;
  onDownloadVersion: (version: DocumentVersionListItem) => void;
};
 
export type UseMockDocumentVersionsResult = {
  selectedDocumentForVersions: VersionDocumentRow | null;
  selectedDocumentVersions: DocumentVersionListItem[];
  openVersionHistory: (document: VersionDocumentRow) => void;
  closeVersionHistory: () => void;
  downloadLatestVersion: (document: VersionDocumentRow) => void;
  downloadVersion: (version: DocumentVersionListItem) => void;
};