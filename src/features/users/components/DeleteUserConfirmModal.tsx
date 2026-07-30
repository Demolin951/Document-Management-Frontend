import ConfirmModal from "../../../shared/components/ConfirmModal";
import type { DeleteUserConfirmModalProps } from "../types/userManagementComponentTypes";

function DeleteUserConfirmModal({
  isOpen,
  user,
  errorMessage,
  isDeletingUser,
  onClose,
  onDeleteUser,
}: DeleteUserConfirmModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Delete user"
      questionText="Are you sure you want to delete this user?"
      targetText={user?.name}
      warningText="This action cannot be undone."
      confirmButtonText="Delete user"
      loadingConfirmButtonText="Deleting..."
      isLoading={isDeletingUser}
      isConfirmDisabled={!user}
      errorMessage={errorMessage}
      onClose={onClose}
      onConfirm={onDeleteUser}
    />
  );
}

export default DeleteUserConfirmModal;
