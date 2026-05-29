import { useState } from "react";

import { downloadLatestDocumentVersion } from "../api/documentDownloadApi";
import type { DocumentActionKey } from "../types/documentActionTypes";
import type { DocumentListItem } from "../types/documentTypes";
import type { UseDocumentActionsResult } from "../types/useDocumentActionTypes";
import { saveBlobAsFile } from "../utils/documentDownloadUtils";

export function useDocumentActions(
  username: string | undefined,
): UseDocumentActionsResult {
  const [documentActionErrorMessage, setDocumentActionErrorMessage] = useState<
    string | null
  >(null);

  const [isDocumentActionLoading, setIsDocumentActionLoading] = useState(false);

  const [selectedDocumentForAccess, setSelectedDocumentForAccess] =
    useState<DocumentListItem | null>(null);

  const [
    selectedDocumentForVersionUpload,
    setSelectedDocumentForVersionUpload,
  ] = useState<DocumentListItem | null>(null);

  function closeManageAccessModal() {
    setSelectedDocumentForAccess(null);
  }

  function closeUploadVersionModal() {
    setSelectedDocumentForVersionUpload(null);
  }

  async function handleDownloadDocument(document: DocumentListItem) {
    if (!username) {
      setDocumentActionErrorMessage("Please select a user before downloading.");
      return;
    }

    const fileBlob = await downloadLatestDocumentVersion(document.id, username);

    saveBlobAsFile(fileBlob, document.fileName);
  }

  async function handleDocumentAction(
    actionKey: DocumentActionKey,
    document: DocumentListItem,
  ) {
    setDocumentActionErrorMessage(null);

    if (actionKey === "manageAccess") {
      setSelectedDocumentForAccess(document);
      return;
    }

    if (actionKey === "uploadNewVersion") {
      setSelectedDocumentForVersionUpload(document);
      return;
    }

    setIsDocumentActionLoading(true);

    try {
      if (actionKey === "download") {
        await handleDownloadDocument(document);
        return;
      }

      console.info(`Action "${actionKey}" is not implemented yet.`, document);
    } catch {
      setDocumentActionErrorMessage("Document action could not be completed.");
    } finally {
      setIsDocumentActionLoading(false);
    }
  }

  return {
    documentActionErrorMessage,
    isDocumentActionLoading,

    selectedDocumentForAccess,
    closeManageAccessModal,

    selectedDocumentForVersionUpload,
    closeUploadVersionModal,

    handleDocumentAction,
  };
}
