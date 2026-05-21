import { FileText } from "lucide-react";

import DataTable from "../../../components/ui/DataTable";
import EmptyDataTableState from "../../../components/ui/EmptyDataTableState";

import { documentTableColumns } from "../config/documentTableColumns";
import { useDocumentsFeature } from "../hooks/useDocumentsFeature";
import type { DocumentsTableProps } from "../types/documentTableTypes";

import DocumentTableRow from "./DocumentTableRow";
import DocumentsTableFooter from "./DocumentsTableFooter";
import ManageDocumentAccessModal from "./ManageDocumentAccessModal";

function DocumentTable({ username }: DocumentsTableProps) {
  const {
    documents,
    isLoadingDocuments,
    featureError,
    isDocumentActionLoading,
    selectedDocumentForAccess,
    closeManageAccessModal,
    targetUserName,
    setTargetUserName,
    selectedRole,
    setSelectedRole,
    isAddingAccess,
    submitManageAccess,
    handleDocumentAction,
  } = useDocumentsFeature(username);

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

  if (featureError && !selectedDocumentForAccess) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center shadow-sm">
        <p className="text-sm font-semibold text-red-700">{featureError}</p>
      </div>
    );
  }

  return (
    <>
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

      <ManageDocumentAccessModal
        isOpen={Boolean(selectedDocumentForAccess)}
        document={selectedDocumentForAccess}
        targetUserName={targetUserName}
        selectedRole={selectedRole}
        isAddingAccess={isAddingAccess}
        addAccessErrorMessage={featureError}
        onTargetUserNameChange={setTargetUserName}
        onRoleChange={setSelectedRole}
        onSubmit={(event) => {
          event.preventDefault();
          void submitManageAccess();
        }}
        onClose={closeManageAccessModal}
      />
    </>
  );
}

export default DocumentTable;
