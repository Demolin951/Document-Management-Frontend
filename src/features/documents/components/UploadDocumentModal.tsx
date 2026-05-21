import { useState } from "react";

import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import { documentUploadConfig } from "../config/documentUploadConfig";
import type { UploadDocumentModalProps } from "../types/documentUploadTypes";

import UploadDocumentDropzone from "./UploadDocumentDropzone";

function UploadDocumentModal({ isOpen, onClose }: UploadDocumentModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleClose() {
    setSelectedFile(null);
    onClose();
  }

  function handleFileSelect(file: File) {
    setSelectedFile(file);
  }

  return (
    <Modal
      isOpen={isOpen}
      title={documentUploadConfig.modalTitle}
      onClose={handleClose}
    >
      <div className="space-y-5">
        <UploadDocumentDropzone
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
        />

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Cancel
          </button>

          <Button disabled={!selectedFile}>Upload</Button>
        </div>
      </div>
    </Modal>
  );
}

export default UploadDocumentModal;
