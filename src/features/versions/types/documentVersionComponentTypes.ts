import type { DocumentListItem } from "../../../shared/types/documentTypes";
import type { DocumentVersionListItem } from "./documentVersionTypes";

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
