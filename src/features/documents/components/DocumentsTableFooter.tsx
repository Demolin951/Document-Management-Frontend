import { ChevronLeft, ChevronRight } from "lucide-react";

function DocumentsTableFooter() {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">
        Showing 0 to 0 of 0 documents
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400"
        >
          <ChevronLeft size={17} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm"
        >
          1
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400"
        >
          <ChevronRight size={17} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
export default DocumentsTableFooter;
