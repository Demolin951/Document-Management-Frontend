import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import type { DeleteUserConfirmModalProps } from "../types/userManagementTypes";

function DeleteUserConfirmModal({
  isOpen,
  user,
  errorMessage,
  isDeletingUser,
  onClose,
  onDeleteUser,
}: DeleteUserConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} title="Delete user" onClose={onClose}>
      <div className="space-y-5">
        {errorMessage && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="space-y-3 text-sm font-medium text-slate-600">
          <p>Are you sure you want to delete this user?</p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900">
            {user?.name}
          </div>

          <p className="font-semibold text-red-700">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeletingUser}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <Button
            disabled={!user || isDeletingUser}
            onClick={onDeleteUser}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeletingUser ? "Deleting..." : "Delete user"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteUserConfirmModal;
