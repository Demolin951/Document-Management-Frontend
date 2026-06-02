import { FileText } from "lucide-react";

import VersionBadge from "../../../components/ui/VersionBadge";
import type { DocumentListItem } from "../../documents/types/documentTypes";
import { formatDateTime } from "../../documents/utils/formatDateTime";
import DashboardListItem from "./DashboardListItem";

export type RecentDocumentsProps = {
  documents: DocumentListItem[];
};

function RecentDocuments({ documents }: RecentDocumentsProps) {
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Recent Documents
      </h2>

      {documents.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center">
          <p className="text-sm font-semibold text-slate-500">
            No recent documents found.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {documents.map((document) => (
            <DashboardListItem
              key={document.id}
              icon={FileText}
              title={document.fileName}
              subtitle={formatDateTime(document.createdAtUtc)}
              iconBgClass="bg-red-50"
              iconTextClass="text-red-600"
              rightContent={<VersionBadge version={document.role} />}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentDocuments;
