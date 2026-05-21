import { useState } from "react";
 
import { uploadDocument } from "../api/documentUploadApi";
import { documentUploadConfig } from "../config/documentUploadConfig";
import { useDocumentRefreshStore } from "../store/useDocumentRefreshStore";
import type { UseUploadDocumentResult } from "../types/documentUploadTypes";
import { validateUploadFile } from "../utils/documentUploadUtils";
 
export function useUploadDocument(): UseUploadDocumentResult {
  const requestDocumentsRefresh = useDocumentRefreshStore(
    (state) => state.requestDocumentsRefresh
  );
 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(
    null
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
 
  function clearSelectedFile() {
    setSelectedFile(null);
  }
 
  function clearUploadState() {
    setSelectedFile(null);
    setUploadErrorMessage(null);
    setIsUploading(false);
  }
 
  async function uploadSelectedDocument(
    username: string | undefined
  ): Promise<boolean> {
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
      await uploadDocument({
        file: selectedFile,
        username,
      });
 
      requestDocumentsRefresh();
      clearUploadState();
 
      return true;
    } catch {
      setUploadErrorMessage(documentUploadConfig.uploadFailedMessage);
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
    clearSelectedFile,
    clearUploadState,
    uploadSelectedDocument,
  };
}