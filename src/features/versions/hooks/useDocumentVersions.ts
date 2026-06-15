import { useState } from "react";

import { saveBlobAsFile } from "../../../shared/utils/fileDownloadUtils";

import {
  downloadDocumentVersion,
  downloadLatestDocumentVersion,
  getDocumentVersions,
} from "../api/documentVersionsApi";
import type { VersionDocumentRow } from "../types/documentVersionComponentTypes";
import type { UseDocumentVersionsResult } from "../types/documentVersionHookTypes";
import type { DocumentVersionListItem } from "../types/documentVersionTypes";

function getReadableErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export function useDocumentVersions(
  username: string | undefined,
): UseDocumentVersionsResult {
  const [selectedDocumentForVersions, setSelectedDocumentForVersions] =
    useState<VersionDocumentRow | null>(null);

  const [selectedDocumentVersions, setSelectedDocumentVersions] = useState<
    DocumentVersionListItem[]
  >([]);

  const [isLoadingVersions, setIsLoadingVersions] = useState(false);
  const [isVersionActionLoading, setIsVersionActionLoading] = useState(false);
  const [versionsErrorMessage, setVersionsErrorMessage] = useState<
    string | null
  >(null);

  async function openVersionHistory(document: VersionDocumentRow) {
    if (!username) {
      setVersionsErrorMessage("No user selected.");
      return;
    }

    setSelectedDocumentForVersions(document);
    setSelectedDocumentVersions([]);
    setIsLoadingVersions(true);
    setVersionsErrorMessage(null);

    try {
      const versions = await getDocumentVersions(document.id, username);

      setSelectedDocumentVersions(versions);
    } catch (error) {
      setVersionsErrorMessage(
        getReadableErrorMessage(error, "Versions could not be loaded."),
      );
    } finally {
      setIsLoadingVersions(false);
    }
  }

  function closeVersionHistory() {
    setSelectedDocumentForVersions(null);
    setSelectedDocumentVersions([]);
    setVersionsErrorMessage(null);
  }

  async function downloadLatestVersion(document: VersionDocumentRow) {
    if (!username) {
      setVersionsErrorMessage("No user selected.");
      return;
    }

    setIsVersionActionLoading(true);
    setVersionsErrorMessage(null);

    try {
      const downloadResult = await downloadLatestDocumentVersion(
        document.id,
        username,
        document.fileName,
      );

      saveBlobAsFile(downloadResult.blob, downloadResult.fileName);
    } catch (error) {
      setVersionsErrorMessage(
        getReadableErrorMessage(
          error,
          "Latest version could not be downloaded.",
        ),
      );
    } finally {
      setIsVersionActionLoading(false);
    }
  }

  async function downloadVersion(version: DocumentVersionListItem) {
    if (!username || !selectedDocumentForVersions) {
      setVersionsErrorMessage("No document selected.");
      return;
    }

    setIsVersionActionLoading(true);
    setVersionsErrorMessage(null);

    try {
      const downloadResult = await downloadDocumentVersion(
        version.documentId,
        version.versionNumber,
        username,
        selectedDocumentForVersions.fileName,
      );

      saveBlobAsFile(downloadResult.blob, downloadResult.fileName);
    } catch (error) {
      setVersionsErrorMessage(
        getReadableErrorMessage(error, "Version could not be downloaded."),
      );
    } finally {
      setIsVersionActionLoading(false);
    }
  }

  return {
    selectedDocumentForVersions,
    selectedDocumentVersions,
    isLoadingVersions,
    isVersionActionLoading,
    versionsErrorMessage,
    openVersionHistory,
    closeVersionHistory,
    downloadLatestVersion,
    downloadVersion,
  };
}
