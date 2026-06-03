import { useState } from "react";

import type { DocumentListItem } from "../../../shared/types/documentTypes";

import { uploadDocumentVersion } from "../api/documentVersionUploadApi";
import { documentUploadConfig } from "../config/documentUploadConfig";
import { validateUploadFile } from "../validators/documentUploadValidators";

type UseUploadDocumentVersionResult = {
  selectedFile: File | null;
  uploadErrorMessage: string | null;
  isUploading: boolean;
  selectFile: (file: File) => void;
  clearUploadState: () => void;
  uploadSelectedDocumentVersion: (
    document: DocumentListItem | null,
    username: string | undefined,
  ) => Promise<boolean>;
};

export function useUploadDocumentVersion(): UseUploadDocumentVersionResult {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);

  function selectFile(file: File) {
    const validationResult = validateUploadFile(file);

    if (!validationResult.isValid) {
      setSelectedFile(null);
      setUploadErrorMessage(validationResult.errorMessage);
      return;
    }

    setSelectedFile(file);
    setUploadErrorMessage(null);
  }

  function clearUploadState() {
    setSelectedFile(null);
    setUploadErrorMessage(null);
    setIsUploading(false);
  }

  async function uploadSelectedDocumentVersion(
    document: DocumentListItem | null,
    username: string | undefined,
  ): Promise<boolean> {
    if (!selectedFile) {
      setUploadErrorMessage(documentUploadConfig.noFileSelectedMessage);
      return false;
    }

    if (!username) {
      setUploadErrorMessage(documentUploadConfig.noUserSelectedMessage);
      return false;
    }

    if (!document) {
      setUploadErrorMessage("No document selected.");
      return false;
    }

    setIsUploading(true);
    setUploadErrorMessage(null);

    try {
      await uploadDocumentVersion({
        documentId: document.id,
        file: selectedFile,
        username,
      });

      clearUploadState();

      return true;
    } catch {
      setUploadErrorMessage("Document version could not be uploaded.");
      return false;
    } finally {
      setIsUploading(false);
    }
  }

  return {
    selectedFile,
    uploadErrorMessage,
    isUploading,
    selectFile,
    clearUploadState,
    uploadSelectedDocumentVersion,
  };
}
