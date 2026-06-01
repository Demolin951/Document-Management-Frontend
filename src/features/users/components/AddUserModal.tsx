import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import type { AddUserModalProps } from "../types/userManagementTypes";

function AddUserModal({
  isOpen,
  username,
  errorMessage,
  isCreatingUser,
  onUsernameChange,
  onClose,
  onCreateUser,
}: AddUserModalProps) {
  const trimmedUsername = username.trim();
  const isCreateDisabled = !trimmedUsername || isCreatingUser;

  return (
    <Modal isOpen={isOpen} title="Add User" onClose={onClose}>
      <div className="space-y-5">
        {errorMessage && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm font-semibold text-slate-700"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            disabled={isCreatingUser}
            onChange={(event) => onUsernameChange(event.target.value)}
            placeholder="Enter username"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isCreatingUser}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <Button disabled={isCreateDisabled} onClick={onCreateUser}>
            {isCreatingUser ? "Creating..." : "Create user"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddUserModal;
