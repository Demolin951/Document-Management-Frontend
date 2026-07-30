import { useState } from "react";

import ConfirmModal from "../../../shared/components/ConfirmModal";
import type { DocumentListItem } from "../../../shared/types/documentTypes";

import { deleteDocument } from "../api/documentDeleteApi";

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
    <ConfirmModal
      isOpen={isOpen}
      title="Delete document"
      questionText="Are you sure you want to delete this document?"
      targetText={document?.fileName}
      warningText="This action cannot be undone."
      confirmButtonText="Delete document"
      loadingConfirmButtonText="Deleting..."
      isLoading={isDeleting}
      isConfirmDisabled={!document || !username}
      errorMessage={deleteErrorMessage}
      onClose={handleClose}
      onConfirm={handleDeleteClick}
    />
  );
}

export default DeleteDocumentConfirmModal;
