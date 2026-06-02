import { FileText } from "lucide-react";

import DataTable from "../../../components/ui/DataTable";
import EmptyDataTableState from "../../../components/ui/EmptyDataTableState";
import { useDocuments } from "../../../shared/hooks/useDocuments";

import { documentTableColumns } from "../config/documentTableColumns";
import { useDocumentActions } from "../hooks/useDocumentActions";
import type { DocumentsTableProps } from "../types/documentTableTypes";

import DeleteDocumentConfirmModal from "./DeleteDocumentConfirmModal";
import DocumentTableRow from "./DocumentTableRow";
import DocumentsTableFooter from "./DocumentsTableFooter";
import ManageDocumentAccessModal from "./ManageDocumentAccessModal";
import UploadDocumentVersionModal from "./UploadDocumentVersionModal";

function DocumentTable({ username }: DocumentsTableProps) {
  const {
    documents,
    isLoadingDocuments,
    documentsErrorMessage,
    reloadDocuments,
  } = useDocuments(username);

  const {
    documentActionErrorMessage,
    isDocumentActionLoading,
    selectedDocumentForAccess,
    closeManageAccessModal,
    selectedDocumentForVersionUpload,
    closeUploadVersionModal,
    selectedDocumentForDelete,
    closeDeleteDocumentModal,
    handleDocumentAction,
  } = useDocumentActions(username);

  if (!username) {
    return (
      <EmptyDataTableState
        icon={FileText}
        title="No user selected"
        description="Select a user in the sidebar to load documents."
      />
    );
  }

  if (isLoadingDocuments) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
        <p className="text-sm font-semibold text-slate-500">
          Loading documents...
        </p>
      </div>
    );
  }

  if (documentsErrorMessage) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center shadow-sm">
        <p className="text-sm font-semibold text-red-700">
          {documentsErrorMessage}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {documentActionErrorMessage && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {documentActionErrorMessage}
          </div>
        )}

        <DataTable
          columns={documentTableColumns}
          emptyState={
            <EmptyDataTableState
              icon={FileText}
              title="No documents yet"
              description="This user does not have access to any documents yet."
            />
          }
          footer={<DocumentsTableFooter totalCount={documents.length} />}
        >
          {documents.map((document) => (
            <DocumentTableRow
              key={document.id}
              document={document}
              onDocumentAction={handleDocumentAction}
              isDocumentActionLoading={isDocumentActionLoading}
            />
          ))}
        </DataTable>
      </div>

      <ManageDocumentAccessModal
        isOpen={Boolean(selectedDocumentForAccess)}
        document={selectedDocumentForAccess}
        ownerUsername={username}
        onClose={closeManageAccessModal}
        onAccessChanged={reloadDocuments}
      />

      <UploadDocumentVersionModal
        isOpen={Boolean(selectedDocumentForVersionUpload)}
        document={selectedDocumentForVersionUpload}
        selectedUsername={username}
        onClose={closeUploadVersionModal}
        onVersionUploaded={reloadDocuments}
      />

      <DeleteDocumentConfirmModal
        isOpen={Boolean(selectedDocumentForDelete)}
        document={selectedDocumentForDelete}
        username={username}
        onClose={closeDeleteDocumentModal}
        onDocumentDeleted={reloadDocuments}
      />
    </>
  );
}

export default DocumentTable;
