import SectionCard from "../components/ui/SectionCard";
import AvailableDocumentsVersionTable from "../features/versions/components/AvailableDocumentsVersionTable";
import VersionHistoryModal from "../features/versions/components/VersionHistoryModal";
import { mockVersionDocuments } from "../features/versions/config/documentVersionsConfig";
import { useMockDocumentVersions } from "../features/versions/hooks/useMockDocumentVersions";

function DocumentVersionsPage() {
  const {
    selectedDocumentForVersions,
    selectedDocumentVersions,
    openVersionHistory,
    closeVersionHistory,
    downloadLatestVersion,
    downloadVersion,
  } = useMockDocumentVersions();

  return (
    <>
      <div className="space-y-6">
        <SectionCard>
          <AvailableDocumentsVersionTable
            documents={mockVersionDocuments}
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
