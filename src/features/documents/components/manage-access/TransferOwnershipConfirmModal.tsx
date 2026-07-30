import ConfirmModal from "../../../../shared/components/ConfirmModal";
import { transferOwnershipConfirmConfig } from "../../config/transferOwnershipConfig";
import type { TransferOwnershipConfirmModalProps } from "../../types/documentAccessComponentTypes";

function TransferOwnershipConfirmModal({
  isOpen,
  document,
  newOwnerUsername,
  isTransferringOwnership,
  onClose,
  onConfirmTransferOwnership,
}: TransferOwnershipConfirmModalProps) {
  const targetText = document ? (
    <div className="space-y-2">
      <p className="truncate text-sm font-bold text-slate-900">
        {document.fileName}
      </p>

      <p className="text-sm font-semibold text-slate-700">
        New owner: <span className="text-slate-900">{newOwnerUsername}</span>
      </p>
    </div>
  ) : null;

  return (
    <ConfirmModal
      isOpen={isOpen}
      title={transferOwnershipConfirmConfig.title}
      questionText={transferOwnershipConfirmConfig.questionText}
      targetText={targetText}
      warningText={transferOwnershipConfirmConfig.warningText}
      cancelButtonText={transferOwnershipConfirmConfig.cancelButtonText}
      confirmButtonText={transferOwnershipConfirmConfig.confirmButtonText}
      loadingConfirmButtonText={transferOwnershipConfirmConfig.transferringButtonText}
      isLoading={isTransferringOwnership}
      isConfirmDisabled={!document || !newOwnerUsername}
      onClose={onClose}
      onConfirm={onConfirmTransferOwnership}
    />
  );
}

export default TransferOwnershipConfirmModal;
