import { useState } from "react";
 
import type { UseUploadDocumentResult } from "../types/documentUploadTypes";
import { validateUploadFile } from "../utils/documentUploadUtils";
 
export function useUploadDocument(): UseUploadDocumentResult {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(
    null
  );
 
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
  }
 
  return {
    selectedFile,
    uploadErrorMessage,
    selectFile,
    clearSelectedFile,
    clearUploadState,
  };
}