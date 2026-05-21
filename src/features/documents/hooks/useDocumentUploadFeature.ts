import { useState } from "react";

import { uploadDocument } from "../api/documentUploadApi";
import { documentUploadConfig } from "../config/documentUploadConfig";
import { useDocumentRefreshStore } from "../store/useDocumentRefreshStore";
import { validateUploadFile } from "../utils/documentUploadUtils";

export function useDocumentUploadFeature(username: string | undefined) {
  const requestDocumentsRefresh = useDocumentRefreshStore(
    (state) => state.requestDocumentsRefresh,
  );

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(
    null,
  );

  function openUploadModal() {
    setUploadErrorMessage(null);
    setIsUploadModalOpen(true);
  }

  function closeUploadModal() {
    setSelectedFile(null);
    setUploadErrorMessage(null);
    setIsUploadModalOpen(false);
  }

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

  async function submitUpload() {
    if (!selectedFile) {
      setUploadErrorMessage(documentUploadConfig.noFileSelectedMessage);
      return false;
    }

    if (!username) {
      setUploadErrorMessage(documentUploadConfig.noUserSelectedMessage);
      return false;
    }

    setIsUploading(true);
    setUploadErrorMessage(null);

    try {
      await uploadDocument({ file: selectedFile, username });
      requestDocumentsRefresh();
      closeUploadModal();
      return true;
    } catch {
      setUploadErrorMessage(documentUploadConfig.uploadFailedMessage);
      return false;
    } finally {
      setIsUploading(false);
    }
  }

  return {
    isUploadModalOpen,
    openUploadModal,
    closeUploadModal,
    selectedFile,
    selectFile,
    isUploading,
    uploadErrorMessage,
    submitUpload,
  };
}
