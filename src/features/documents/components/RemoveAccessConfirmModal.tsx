import ConfirmModal from "../../../shared/components/ConfirmModal";
import type { RemoveAccessConfirmModalProps } from "../types/documentAccessComponentTypes";

function RemoveAccessConfirmModal({
  isOpen,
  accessUser,
  isRemovingAccess,
  onClose,
  onConfirmRemoveAccess,
}: RemoveAccessConfirmModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Remove access"
      questionText="Are you sure you want to remove access for this user?"
      targetText={accessUser?.name}
      warningText="This user will no longer be able to access this document."
      confirmButtonText="Remove access"
      loadingConfirmButtonText="Removing..."
      isLoading={isRemovingAccess}
      isConfirmDisabled={!accessUser}
      onClose={onClose}
      onConfirm={onConfirmRemoveAccess}
    />
  );
}

export default RemoveAccessConfirmModal;
