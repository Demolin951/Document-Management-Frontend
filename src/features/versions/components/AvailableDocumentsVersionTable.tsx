import { FileText } from "lucide-react";

import DataTable from "../../../components/ui/DataTable";
import EmptyDataTableState from "../../../components/ui/EmptyDataTableState";
import { availableDocumentsVersionTableColumns } from "../config/documentVersionsConfig";
import type { AvailableDocumentsVersionTableProps } from "../types/documentVersionTypes";

import VersionDocumentRow from "./VersionDocumentRow";

function AvailableDocumentsVersionTable({
  documents,
  onDownloadLatest,
  onOpenVersionHistory,
}: AvailableDocumentsVersionTableProps) {
  return (
    <DataTable
      columns={availableDocumentsVersionTableColumns}
      emptyState={
        <EmptyDataTableState
          icon={FileText}
          title="No documents available"
          description="This user does not have access to any documents."
        />
      }
    >
      {documents.map((document) => (
        <VersionDocumentRow
          key={document.id}
          document={document}
          onDownloadLatest={onDownloadLatest}
          onOpenVersionHistory={onOpenVersionHistory}
        />
      ))}
    </DataTable>
  );
}

export default AvailableDocumentsVersionTable;
