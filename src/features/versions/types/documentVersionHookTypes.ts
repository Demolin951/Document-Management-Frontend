import type { DocumentVersionListItem } from "./documentVersionTypes";
import type { VersionDocumentRow } from "./documentVersionComponentTypes";

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
