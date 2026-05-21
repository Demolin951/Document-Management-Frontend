import type { DocumentUploadConfig } from "../types/documentUploadTypes";
 
export const documentUploadConfig: DocumentUploadConfig = {
  acceptedFileTypes: ".pdf,application/pdf",
  maxFileSizeInMb: 10,
  modalTitle: "Upload Document",
  dropzoneTitle: "Drag and drop your file here",
  dropzoneDividerText: "or",
  chooseFileButtonText: "Choose File",
  selectedFileLabel: "Selected file",
  noUserSelectedText: "No user selected",
  invalidFileTypeMessage: "Only PDF files are allowed.",
  invalidFileSizeMessage: "The selected file is too large.",
};