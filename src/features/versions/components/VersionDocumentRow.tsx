import { Download, FileText, Layers } from "lucide-react";

import DataTableRow from "../../../components/ui/DataTableRow";
import { availableDocumentsVersionTableColumns } from "../config/documentVersionsConfig";
import type { VersionDocumentRowProps } from "../types/documentVersionTypes";

function VersionDocumentRow({
  document,
  onDownloadLatest,
  onOpenVersionHistory,
}: VersionDocumentRowProps) {
  const canViewVersionHistory =
    document.role === "Owner" || document.role === "Editor";

  return (
    <DataTableRow columns={availableDocumentsVersionTableColumns}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
          <FileText size={18} strokeWidth={2.5} />
        </div>

        <span
          title={document.fileName}
          className="max-w-105 truncate font-semibold text-slate-900"
        >
          {document.fileName}
        </span>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          title="Download latest version"
          onClick={() => onDownloadLatest(document)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
        >
          <Download size={16} strokeWidth={2.4} />
        </button>

        {canViewVersionHistory && (
          <button
            type="button"
            title="Show versions"
            onClick={() => onOpenVersionHistory(document)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
          >
            <Layers size={16} strokeWidth={2.4} />
          </button>
        )}
      </div>
    </DataTableRow>
  );
}

export default VersionDocumentRow;
