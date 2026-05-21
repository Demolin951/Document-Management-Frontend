import { documentUploadConfig } from "../config/documentUploadConfig";
import type { UploadDocumentValidationResult } from "../types/documentUploadTypes";
 
export function isPdfFile(file: File): boolean {
  const hasPdfMimeType = file.type === "application/pdf";
  const hasPdfExtension = file.name.toLowerCase().endsWith(".pdf");
 
  return hasPdfMimeType || hasPdfExtension;
}
 
export function isFileSizeAllowed(file: File): boolean {
  const maxFileSizeInBytes =
    documentUploadConfig.maxFileSizeInMb * 1024 * 1024;
 
  return file.size <= maxFileSizeInBytes;
}
 
export function validateUploadFile(file: File): UploadDocumentValidationResult {
  if (!isPdfFile(file)) {
    return {
      isValid: false,
      errorMessage: documentUploadConfig.invalidFileTypeMessage,
    };
  }
 
  if (!isFileSizeAllowed(file)) {
    return {
      isValid: false,
      errorMessage: `${documentUploadConfig.invalidFileSizeMessage} Maximum size is ${documentUploadConfig.maxFileSizeInMb} MB.`,
    };
  }
 
  return {
    isValid: true,
    errorMessage: null,
  };
}