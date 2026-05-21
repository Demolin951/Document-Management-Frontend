import { useState } from "react";

import { downloadLatestDocumentVersion } from "../api/documentDownloadApi";
import type { DocumentListItem } from "../types/documentTypes";
import { saveBlobAsFile } from "../utils/documentDownloadUtils";

export function useDocumentDownloadFeature(username: string | undefined) {
  const [isDocumentActionLoading, setIsDocumentActionLoading] = useState(false);
  const [downloadErrorMessage, setDownloadErrorMessage] = useState<string | null>(null);

  async function downloadDocument(document: DocumentListItem) {
    setDownloadErrorMessage(null);
    setIsDocumentActionLoading(true);

    try {
      if (!username) {
        setDownloadErrorMessage("Please select a user before downloading.");
        return;
      }

      const fileBlob = await downloadLatestDocumentVersion(document.id, username);
      saveBlobAsFile(fileBlob, document.fileName);
    } catch {
      setDownloadErrorMessage("Document action could not be completed.");
    } finally {
      setIsDocumentActionLoading(false);
    }
  }

  return {
    isDocumentActionLoading,
    downloadErrorMessage,
    downloadDocument,
    clearDownloadError: () => setDownloadErrorMessage(null),
  };
}
