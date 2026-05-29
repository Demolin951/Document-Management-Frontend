import type { DocumentListItem } from "../../documents/types/documentTypes";

export type DocumentVersionListItem = {
  id: number;
  documentId: number;
  versionNumber: number;
  uploadedBy: string;
  uploadedAtUtc: string;
};

export type DocumentVersionApiResponse = {
  id?: number;
  Id?: number;
  documentId?: number;
  DocumentId?: number;
  versionNumber?: number;
  VersionNumber?: number;
  uploadedBy?: string;
  UploadedBy?: string;
  uploadedAtUtc?: string;
  UploadedAtUtc?: string;
};

export type VersionDocumentRow = DocumentListItem;

export type VersionHistoryModalProps = {
  isOpen: boolean;
  document: VersionDocumentRow | null;
  versions: DocumentVersionListItem[];
  isLoadingVersions: boolean;
  versionsErrorMessage: string | null;
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

export type UseDocumentVersionsResult = {
  selectedDocumentForVersions: VersionDocumentRow | null;
  selectedDocumentVersions: DocumentVersionListItem[];
  isLoadingVersions: boolean;
  isVersionActionLoading: boolean;
  versionsErrorMessage: string | null;
  openVersionHistory: (document: VersionDocumentRow) => Promise<void>;
  closeVersionHistory: () => void;
  downloadLatestVersion: (document: VersionDocumentRow) => Promise<void>;
  downloadVersion: (version: DocumentVersionListItem) => Promise<void>;
};
