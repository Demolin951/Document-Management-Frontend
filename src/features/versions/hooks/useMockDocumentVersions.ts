import { useState } from "react";
 
import { mockDocumentVersionsByDocumentId } from "../config/documentVersionsConfig";
import type {
  DocumentVersionListItem,
  UseMockDocumentVersionsResult,
  VersionDocumentRow,
} from "../types/documentVersionTypes";
 
export function useMockDocumentVersions(): UseMockDocumentVersionsResult {
  const [selectedDocumentForVersions, setSelectedDocumentForVersions] =
    useState<VersionDocumentRow | null>(null);
 
  const selectedDocumentVersions =
    selectedDocumentForVersions === null
      ? []
      : mockDocumentVersionsByDocumentId[selectedDocumentForVersions.id] ?? [];
 
  function openVersionHistory(document: VersionDocumentRow) {
    setSelectedDocumentForVersions(document);
  }
 
  function closeVersionHistory() {
    setSelectedDocumentForVersions(null);
  }
 
  function downloadLatestVersion(document: VersionDocumentRow) {
    console.info("Mock download latest version", {
      documentId: document.id,
      fileName: document.fileName,
    });
  }
 
  function downloadVersion(version: DocumentVersionListItem) {
    console.info("Mock download selected version", {
      documentId: version.documentId,
      versionNumber: version.versionNumber,
    });
  }
 
  return {
    selectedDocumentForVersions,
    selectedDocumentVersions,
    openVersionHistory,
    closeVersionHistory,
    downloadLatestVersion,
    downloadVersion,
  };
}