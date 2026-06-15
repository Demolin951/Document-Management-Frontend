import { FileText } from "lucide-react";

import DataTable from "../../../shared/components/ui/DataTable";
import EmptyDataTableState from "../../../shared/components/ui/DataTableEmptyState";
import { availableDocumentsVersionTableColumns } from "../config/documentVersionsConfig";
import type { AvailableDocumentsVersionTableProps } from "../types/documentVersionTypes";
import VersionDocumentRow from "./VersionDocumentRow";

function AvailableDocumentsVersionTable({ documents, onDownloadLatest, onOpenVersionHistory }: AvailableDocumentsVersionTableProps) {
  return (
    <DataTable columns={availableDocumentsVersionTableColumns} emptyState={<EmptyDataTableState icon={FileText} title="No documents available" description="No documents found." />}>
      {documents.map((document) => (
        <VersionDocumentRow key={document.id} document={document} onDownloadLatest={onDownloadLatest} onOpenVersionHistory={onOpenVersionHistory} />
      ))}
    </DataTable>
  );
}

export default AvailableDocumentsVersionTable;
