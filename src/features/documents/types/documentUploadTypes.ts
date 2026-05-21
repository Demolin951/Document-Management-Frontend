import type { ChangeEvent, DragEvent } from "react";
 
export type UploadDocumentModalProps = {
  isOpen: boolean;
  selectedUsername: string | undefined;
  onClose: () => void;
};
 
export type UploadDocumentDropzoneProps = {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
};
 
export type UploadDocumentDropzoneInputChangeEvent =
  ChangeEvent<HTMLInputElement>;
 
export type UploadDocumentDropzoneDragEvent = DragEvent<HTMLDivElement>;
 
export type DocumentUploadConfig = {
  acceptedFileTypes: string;
  maxFileSizeInMb: number;
  modalTitle: string;
  dropzoneTitle: string;
  dropzoneDividerText: string;
  chooseFileButtonText: string;
  selectedFileLabel: string;
  noUserSelectedText: string;
  invalidFileTypeMessage: string;
  invalidFileSizeMessage: string;
};
 
export type UploadDocumentValidationResult = {
  isValid: boolean;
  errorMessage: string | null;
};
 
export type UseUploadDocumentResult = {
  selectedFile: File | null;
  uploadErrorMessage: string | null;
  selectFile: (file: File) => void;
  clearSelectedFile: () => void;
  clearUploadState: () => void;
};