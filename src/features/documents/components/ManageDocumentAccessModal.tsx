import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import {
  documentAccessConfig,
  documentAccessRoleOptions,
} from "../config/documentAccessConfig";
import { useAddDocumentAccess } from "../hooks/useAddDocumentAccess";
import type {
  AddDocumentAccessFormSubmitEvent,
  AddDocumentAccessInputChangeEvent,
  AddDocumentAccessRole,
  AddDocumentAccessRoleChangeEvent,
  ManageDocumentAccessModalProps,
} from "../types/documentAccessTypes";

function ManageDocumentAccessModal({
  isOpen,
  document,
  ownerUsername,
  onClose,
}: ManageDocumentAccessModalProps) {
  const {
    targetUserName,
    selectedRole,
    isAddingAccess,
    addAccessErrorMessage,
    setTargetUserName,
    setSelectedRole,
    resetAddAccessState,
    submitAddAccess,
  } = useAddDocumentAccess();

  function handleClose() {
    resetAddAccessState();
    onClose();
  }

  function handleTargetUsernameChange(
    event: AddDocumentAccessInputChangeEvent,
  ) {
    setTargetUserName(event.target.value);
  }

  function handleRoleChange(event: AddDocumentAccessRoleChangeEvent) {
    setSelectedRole(event.target.value as AddDocumentAccessRole);
  }

  async function handleSubmit(event: AddDocumentAccessFormSubmitEvent) {
    event.preventDefault();

    const wasAccessAdded = await submitAddAccess(document, ownerUsername);

    if (wasAccessAdded) {
      onClose();
    }
  }

  const isSubmitDisabled =
    isAddingAccess || !targetUserName.trim() || !document || !ownerUsername;

  return (
    <Modal
      isOpen={isOpen}
      title={documentAccessConfig.modalTitle}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {document && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="truncate text-sm font-semibold text-slate-600">
              Document:{" "}
              <span title={document.fileName} className="text-slate-900">
                {document.fileName}
              </span>
            </p>
          </div>
        )}

        {addAccessErrorMessage && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {addAccessErrorMessage}
          </div>
        )}

        <div>
          <label className="text-sm font-bold text-slate-700">
            {documentAccessConfig.targetUsernameLabel}
          </label>

          <input
            type="text"
            value={targetUserName}
            onChange={handleTargetUsernameChange}
            placeholder={documentAccessConfig.targetUsernamePlaceholder}
            disabled={isAddingAccess}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-slate-700">
            {documentAccessConfig.roleLabel}
          </label>

          <select
            value={selectedRole}
            onChange={handleRoleChange}
            disabled={isAddingAccess}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
          >
            {documentAccessRoleOptions.map((roleOption) => (
              <option key={roleOption.value} value={roleOption.value}>
                {roleOption.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={handleClose}
            disabled={isAddingAccess}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {documentAccessConfig.cancelButtonText}
          </button>

          <Button type="submit" disabled={isSubmitDisabled}>
            {isAddingAccess
              ? documentAccessConfig.addingAccessButtonText
              : documentAccessConfig.addAccessButtonText}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ManageDocumentAccessModal;
