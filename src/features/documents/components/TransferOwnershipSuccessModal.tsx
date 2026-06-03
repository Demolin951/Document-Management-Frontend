import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { transferOwnershipSuccessConfig } from "../config/transferOwnershipConfig";
import type { TransferOwnershipSuccessModalProps } from "../types/documentAccessComponentTypes";

function TransferOwnershipSuccessModal({
  isOpen,
  message,
  onClose,
}: TransferOwnershipSuccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={transferOwnershipSuccessConfig.title}
      onClose={onClose}
    >
      <div className="space-y-5">
        <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {message}
        </div>

        <div className="flex justify-end border-t border-slate-200 pt-5">
          <Button onClick={onClose}>
            {transferOwnershipSuccessConfig.closeButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default TransferOwnershipSuccessModal;
