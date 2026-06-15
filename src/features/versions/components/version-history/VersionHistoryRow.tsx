import { Download } from "lucide-react";

import DataTableRow from "../../../../shared/components/ui/DataTableRow";
import { formatDateTime } from "../../../../shared/utils/formatDateTime";

import { versionHistoryTableColumns } from "../../config/documentVersionsConfig";
import type { VersionHistoryRowProps } from "../../types/documentVersionComponentTypes";

function VersionHistoryRow({
  version,
  onDownloadVersion,
}: VersionHistoryRowProps) {
  return (
    <DataTableRow columns={versionHistoryTableColumns}>
      <div className="font-semibold text-slate-900">
        v{version.versionNumber}
      </div>

      <div className="font-medium text-slate-600">{version.uploadedBy}</div>

      <div className="font-medium text-slate-500">
        {formatDateTime(version.uploadedAtUtc)}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          title="Download version"
          onClick={() => onDownloadVersion(version)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
        >
          <Download size={16} strokeWidth={2.4} />
        </button>
      </div>
    </DataTableRow>
  );
}

export default VersionHistoryRow;
