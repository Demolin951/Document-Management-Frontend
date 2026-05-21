import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DocumentsTableFooterProps } from "../types/documentTableTypes";

function DocumentsTableFooter({ totalCount }: DocumentsTableFooterProps) {
  const firstVisibleDocumentNumber = totalCount === 0 ? 0 : 1;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">
        Showing {firstVisibleDocumentNumber} to {totalCount} of {totalCount}{" "}
        documents
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-300"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          type="button"
          disabled
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-300"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default DocumentsTableFooter;
