import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import {
  documentAccessConfig,
  documentAccessRoleOptions,
} from "../config/documentAccessConfig";
import type {
  AddDocumentAccessRole,
  ManageDocumentAccessModalProps,
} from "../types/documentAccessTypes";

function ManageDocumentAccessModal({
  isOpen,
  document,
  targetUserName,
  selectedRole,
  isAddingAccess,
  addAccessErrorMessage,
  onTargetUserNameChange,
  onRoleChange,
  onSubmit,
  onClose,
}: ManageDocumentAccessModalProps) {
  const isSubmitDisabled = isAddingAccess || !targetUserName.trim() || !document;

  return (
    <Modal
      isOpen={isOpen}
      title={documentAccessConfig.modalTitle}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {document && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="truncate text-sm font-semibold text-slate-600">
              Document: <span title={document.fileName} className="text-slate-900">{document.fileName}</span>
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
            onChange={(event) => onTargetUserNameChange(event.target.value)}
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
            onChange={(event) => onRoleChange(event.target.value as AddDocumentAccessRole)}
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
            onClick={onClose}
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
