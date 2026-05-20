import { FileText } from "lucide-react";
import DataTable from "../../../components/ui/DataTable";
import DocumentsTableFooter from "./DocumentsTableFooter";
import { documentTableColumns } from "../../config/documentTableColumns";
import EmptyDataTableState from "../../../components/ui/EmptyDataTableState";

function DocumentsTable() {
  return (
    <DataTable
      columns={documentTableColumns}
      emptyState={
        <EmptyDataTableState
          icon={FileText}
          title="No documents yet"
          description="Documents will be displayed here after they are loaded from the API."
        />
      }
      footer={<DocumentsTableFooter />}
    />
  );
}

export default DocumentsTable;
