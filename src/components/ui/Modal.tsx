import { X } from "lucide-react";

import type { ModalProps } from "./types/modalTypes";

function Modal({
  isOpen,
  title,
  children,
  onClose,
  panelClassName,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  const defaultPanelClassName = "w-[92vw] max-w-3xl lg:w-[50vw]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-6"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`${
          panelClassName ?? defaultPanelClassName
        } rounded-2xl bg-white shadow-2xl`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="modal-title" className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
