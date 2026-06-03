import { useSelectedUserStore } from "../app/store/useSelectedUserStore";
import SectionCard from "../components/ui/SectionCard";
import DocumentsTable from "../features/documents/components/DocumentTable";

function DocumentsPage() {
  const selectedUser = useSelectedUserStore((state) => state.selectedUser);

  return (
    <div className="space-y-6">
      <SectionCard>
        <DocumentsTable username={selectedUser?.name} />
      </SectionCard>
    </div>
  );
}

export default DocumentsPage;
