import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import type { RemoveAccessConfirmModalProps } from "../types/documentAccessTypes";

function RemoveAccessConfirmModal({
  isOpen,
  accessUser,
  isRemovingAccess,
  onClose,
  onConfirmRemoveAccess,
}: RemoveAccessConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} title="Remove access" onClose={onClose}>
      <div className="space-y-5">
        <div className="space-y-3 text-sm font-medium text-slate-600">
          <p>Are you sure you want to remove access for this user?</p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900">
            {accessUser?.name}
          </div>

          <p className="font-semibold text-red-700">
            This user will no longer be able to access this document.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isRemovingAccess}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <Button
            disabled={!accessUser || isRemovingAccess}
            onClick={onConfirmRemoveAccess}
            className="bg-red-600 hover:bg-red-700"
          >
            {isRemovingAccess ? "Removing..." : "Remove access"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default RemoveAccessConfirmModal;
