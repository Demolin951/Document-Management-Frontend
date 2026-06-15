import { FileText, MoveRight } from "lucide-react";
import { Link } from "react-router";

import VersionLabel from "../../../shared/components/ui/VersionLabel";
import type { DocumentListItem } from "../../../shared/types/documentTypes";
import { formatDateTime } from "../../../shared/utils/formatDateTime";
import DashboardListItem from "./DashboardListItem";

export type RecentDocumentsProps = {
  documents: DocumentListItem[];
};

function RecentDocuments({ documents }: RecentDocumentsProps) {
  const hasRecentDocuments = documents.length > 0;

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Recent Documents
      </h2>

      {!hasRecentDocuments ? (
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
              rightContent={<VersionLabel version={document.role} />}
            />
          ))}
        </div>
      )}

      {hasRecentDocuments && (
        <Link
          to="/documents"
          className="mt-auto flex items-center gap-2 self-start text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View all documents
          <MoveRight size={16} strokeWidth={2.5} className="mt-0.5" />
        </Link>
      )}
    </div>
  );
}

export default RecentDocuments;
