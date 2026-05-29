import SectionCard from "../components/ui/SectionCard";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import { useDocuments } from "../features/documents/hooks/useDocuments";
import AvailableDocumentsVersionTable from "../features/versions/components/AvailableDocumentsVersionTable";
import VersionHistoryModal from "../features/versions/components/VersionHistoryModal";
import { useMockDocumentVersions } from "../features/versions/hooks/useMockDocumentVersions";

function DocumentVersionsPage() {
  const selectedUser = useAuthStore((state) => state.selectedUser);

  const { documents, isLoadingDocuments, documentsErrorMessage } = useDocuments(
    selectedUser?.name,
  );

  const {
    selectedDocumentForVersions,
    selectedDocumentVersions,
    openVersionHistory,
    closeVersionHistory,
    downloadLatestVersion,
    downloadVersion,
  } = useMockDocumentVersions();

  if (!selectedUser) {
    return (
      <SectionCard>
        <div className="px-6 py-10 text-center">
          <p className="text-sm font-semibold text-slate-500">
            Select a user in the sidebar to load documents.
          </p>
        </div>
      </SectionCard>
    );
  }

  if (isLoadingDocuments) {
    return (
      <SectionCard>
        <div className="px-6 py-10 text-center">
          <p className="text-sm font-semibold text-slate-500">
            Loading documents...
          </p>
        </div>
      </SectionCard>
    );
  }

  if (documentsErrorMessage) {
    return (
      <SectionCard>
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {documentsErrorMessage}
        </div>
      </SectionCard>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <SectionCard>
          <AvailableDocumentsVersionTable
            documents={documents}
            onDownloadLatest={downloadLatestVersion}
            onOpenVersionHistory={openVersionHistory}
          />
        </SectionCard>
      </div>

      <VersionHistoryModal
        isOpen={Boolean(selectedDocumentForVersions)}
        document={selectedDocumentForVersions}
        versions={selectedDocumentVersions}
        onClose={closeVersionHistory}
        onDownloadVersion={downloadVersion}
      />
    </>
  );
}

export default DocumentVersionsPage;
