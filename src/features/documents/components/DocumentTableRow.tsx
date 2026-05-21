import { FileText } from "lucide-react";

import DataTableRow from "../../../components/ui/DataTableRow";
import { documentRoleConfig } from "../config/documentRoleConfig";
import { documentTableColumns } from "../config/documentTableColumns";
import type { DocumentListItem } from "../types/documentTypes";
import { getAvailableDocumentActions } from "../utils/documentPermissions";
import { formatDateTime } from "../utils/formatDateTime";

type DocumentTableRowProps = {
  document: DocumentListItem;
};

function DocumentTableRow({ document }: DocumentTableRowProps) {
  const roleConfig = documentRoleConfig[document.role];
  const availableActions = getAvailableDocumentActions(document.role);

  return (
    <DataTableRow columns={documentTableColumns}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
          <FileText size={18} strokeWidth={2.5} />
        </div>

        <span className="font-semibold text-slate-900">
          {document.fileName}
        </span>
      </div>

      <div className="font-medium text-slate-600">{document.owner}</div>

      <div>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${roleConfig.badgeClassName}`}
        >
          {roleConfig.label}
        </span>
      </div>

      <div className="font-medium text-slate-500">
        {formatDateTime(document.createdAtUtc)}
      </div>

      <div className="flex justify-end gap-2">
        {availableActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.key}
              type="button"
              title={action.title}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            >
              <Icon size={16} strokeWidth={2.4} />
            </button>
          );
        })}
      </div>
    </DataTableRow>
  );
}

export default DocumentTableRow;
