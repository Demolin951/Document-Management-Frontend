import Button from "../../../../shared/components/ui/Button";
import Modal from "../../../../shared/components/ui/Modal";
import type { DocumentListItem } from "../../../../shared/types/documentTypes";

import { useUploadDocumentVersion } from "../../hooks/useUploadDocumentVersion";

import UploadDocumentDropzone from "./UploadDocumentDropzone";

type UploadDocumentVersionModalProps = {
  isOpen: boolean;
  document: DocumentListItem | null;
  selectedUsername: string | undefined;
  onClose: () => void;
  onVersionUploaded?: () => Promise<void> | void;
};

function UploadDocumentVersionModal({
  isOpen,
  document,
  selectedUsername,
  onClose,
  onVersionUploaded,
}: UploadDocumentVersionModalProps) {
  const {
    selectedFile,
    uploadErrorMessage,
    isUploading,
    selectFile,
    clearUploadState,
    uploadSelectedDocumentVersion,
  } = useUploadDocumentVersion();

  const modalTitle = document
    ? `Upload New Version: ${document.fileName}`
    : "Upload New Version";

  const isUploadDisabled =
    !selectedFile || !selectedUsername || !document || isUploading;

  function handleClose() {
    clearUploadState();
    onClose();
  }

  async function handleUploadClick() {
    const wasUploaded = await uploadSelectedDocumentVersion(
      document,
      selectedUsername,
    );

    if (wasUploaded) {
      await onVersionUploaded?.();
      handleClose();
    }
  }

  return (
    <Modal isOpen={isOpen} title={modalTitle} onClose={handleClose}>
      <div className="space-y-5">
        {uploadErrorMessage && (
          <div className="max-w-60 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {uploadErrorMessage}
          </div>
        )}

        <UploadDocumentDropzone
          selectedFile={selectedFile}
          onFileSelect={selectFile}
        />

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={handleClose}
            disabled={isUploading}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <Button disabled={isUploadDisabled} onClick={handleUploadClick}>
            {isUploading ? "Uploading..." : "Upload version"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default UploadDocumentVersionModal;
