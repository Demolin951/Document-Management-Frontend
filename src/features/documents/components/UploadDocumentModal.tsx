import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import { documentUploadConfig } from "../config/documentUploadConfig";
import type { UploadDocumentModalProps } from "../types/documentUploadTypes";

import UploadDocumentDropzone from "./UploadDocumentDropzone";

function UploadDocumentModal({
  isOpen,
  selectedFile,
  uploadErrorMessage,
  isUploading,
  onFileSelect,
  onSubmit,
  onClose,
}: UploadDocumentModalProps) {
  const isUploadDisabled = !selectedFile || isUploading;

  return (
    <Modal
      isOpen={isOpen}
      title={documentUploadConfig.modalTitle}
      onClose={onClose}
    >
      <div className="space-y-5">
        {uploadErrorMessage && (
          <div className="max-w-60 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {uploadErrorMessage}
          </div>
        )}

        <UploadDocumentDropzone
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
        />

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <Button disabled={isUploadDisabled} onClick={onSubmit}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default UploadDocumentModal;
