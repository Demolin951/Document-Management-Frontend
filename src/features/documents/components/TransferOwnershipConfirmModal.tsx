import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { transferOwnershipConfirmConfig } from "../config/transferOwnershipConfig";
import type { TransferOwnershipConfirmModalProps } from "../types/documentAccessComponentTypes";

function TransferOwnershipConfirmModal({
  isOpen,
  document,
  newOwnerUsername,
  isTransferringOwnership,
  onClose,
  onConfirmTransferOwnership,
}: TransferOwnershipConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={transferOwnershipConfirmConfig.title}
      onClose={onClose}
    >
      <div className="space-y-5">
        <div className="space-y-3 text-sm font-medium text-slate-600">
          <p>{transferOwnershipConfirmConfig.questionText}</p>

          <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="truncate text-sm font-bold text-slate-900">
              {document?.fileName}
            </p>

            <p className="text-sm font-semibold text-slate-700">
              New owner: <span className="text-slate-900">{newOwnerUsername}</span>
            </p>
          </div>

          <p className="font-semibold text-red-700">
            {transferOwnershipConfirmConfig.warningText}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isTransferringOwnership}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {transferOwnershipConfirmConfig.cancelButtonText}
          </button>

          <Button
            disabled={!document || !newOwnerUsername || isTransferringOwnership}
            onClick={onConfirmTransferOwnership}
            className="bg-red-600 hover:bg-red-700"
          >
            {isTransferringOwnership
              ? transferOwnershipConfirmConfig.transferringButtonText
              : transferOwnershipConfirmConfig.confirmButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default TransferOwnershipConfirmModal;
