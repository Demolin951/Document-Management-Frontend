import type { ReactNode } from "react";

import Button from "./ui/Button";
import Modal from "./ui/Modal";

export type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  questionText: string;
  targetText?: ReactNode;
  warningText?: string;
  cancelButtonText?: string;
  confirmButtonText: string;
  loadingConfirmButtonText?: string;
  isLoading: boolean;
  isConfirmDisabled?: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

function ConfirmModal({
  isOpen,
  title,
  questionText,
  targetText,
  warningText,
  cancelButtonText = "Cancel",
  confirmButtonText,
  loadingConfirmButtonText,
  isLoading,
  isConfirmDisabled = false,
  errorMessage,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="space-y-5">
        {errorMessage && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="space-y-3 text-sm font-medium text-slate-600">
          <p>{questionText}</p>

          {targetText && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900">
              {targetText}
            </div>
          )}

          {warningText && (
            <p className="font-semibold text-red-700">{warningText}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelButtonText}
          </button>

          <Button
            disabled={isConfirmDisabled || isLoading}
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading && loadingConfirmButtonText
              ? loadingConfirmButtonText
              : confirmButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
