import { useSelectedUserStore } from "../app/store/useSelectedUserStore";
import Panel from "../shared/components/ui/Panel";
import AvailableDocumentsVersionTable from "../features/versions/components/AvailableDocumentsVersionTable";
import VersionHistoryModal from "../features/versions/components/VersionHistoryModal";
import { useDocumentVersions } from "../features/versions/hooks/useDocumentVersions";
import { useDocuments } from "../shared/hooks/useDocuments";

function DocumentVersionsPage() {
  const selectedUser = useSelectedUserStore((state) => state.selectedUser);

  const { documents, isLoadingDocuments, documentsErrorMessage } = useDocuments(
    selectedUser?.name,
  );

  const {
    selectedDocumentForVersions,
    selectedDocumentVersions,
    isLoadingVersions,
    versionsErrorMessage,
    openVersionHistory,
    closeVersionHistory,
    downloadLatestVersion,
    downloadVersion,
  } = useDocumentVersions(selectedUser?.name);

  if (!selectedUser) {
    return (
      <Panel>
        <div className="px-6 py-10 text-center">
          <p className="text-sm font-semibold text-slate-500">
            Select a user in the sidebar to load documents.
          </p>
        </div>
      </Panel>
    );
  }

  if (isLoadingDocuments) {
    return (
      <Panel>
        <div className="px-6 py-10 text-center">
          <p className="text-sm font-semibold text-slate-500">
            Loading documents...
          </p>
        </div>
      </Panel>
    );
  }

  if (documentsErrorMessage) {
    return (
      <Panel>
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {documentsErrorMessage}
        </div>
      </Panel>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <Panel>
          <AvailableDocumentsVersionTable
            documents={documents}
            onDownloadLatest={downloadLatestVersion}
            onOpenVersionHistory={openVersionHistory}
          />
        </Panel>
      </div>

      <VersionHistoryModal
        isOpen={Boolean(selectedDocumentForVersions)}
        document={selectedDocumentForVersions}
        versions={selectedDocumentVersions}
        isLoadingVersions={isLoadingVersions}
        versionsErrorMessage={versionsErrorMessage}
        onClose={closeVersionHistory}
        onDownloadVersion={downloadVersion}
      />
    </>
  );
}

export default DocumentVersionsPage;
