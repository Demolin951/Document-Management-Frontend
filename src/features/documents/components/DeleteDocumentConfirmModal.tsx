import { useState } from "react";

import Modal from "../../../components/ui/Modal";
import { deleteDocument } from "../api/documentDeleteApi";
import type { DocumentListItem } from "../types/documentTypes";

type DeleteDocumentConfirmModalProps = {
  isOpen: boolean;
  document: DocumentListItem | null;
  username: string | undefined;
  onClose: () => void;
  onDocumentDeleted?: () => Promise<void> | void;
};

function DeleteDocumentConfirmModal({
  isOpen,
  document,
  username,
  onClose,
  onDocumentDeleted,
}: DeleteDocumentConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(
    null,
  );

  function handleClose() {
    if (isDeleting) {
      return;
    }

    setDeleteErrorMessage(null);
    onClose();
  }

  async function handleDeleteClick() {
    if (!document || !username) {
      setDeleteErrorMessage("Document could not be deleted.");
      return;
    }

    setIsDeleting(true);
    setDeleteErrorMessage(null);

    try {
      await deleteDocument(document.id, username);
      await onDocumentDeleted?.();
      setDeleteErrorMessage(null);
      onClose();
    } catch {
      setDeleteErrorMessage("Document could not be deleted.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Modal isOpen={isOpen} title="Delete document" onClose={handleClose}>
      <div className="space-y-5">
        {deleteErrorMessage && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {deleteErrorMessage}
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900">
            Are you sure you want to delete this document?
          </p>

          {document && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="truncate text-sm font-bold text-slate-900">
                {document.fileName}
              </p>
            </div>
          )}

          <p className="text-sm font-medium text-slate-500">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={handleClose}
            disabled={isDeleting}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDeleteClick}
            disabled={isDeleting || !document || !username}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete document"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteDocumentConfirmModal;
