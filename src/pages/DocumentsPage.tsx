import SectionCard from "../components/ui/SectionCard";
import DocumentsTable from "../features/documents/components/DocumentTable";
import { useAuthStore } from "../app/store/useAuthStore";
 
function DocumentsPage() {
  const selectedUser = useAuthStore((state) => state.selectedUser);
 
  return (
<div className="space-y-6">
<SectionCard>
<DocumentsTable username={selectedUser?.name} />
</SectionCard>
</div>
  );
}
 
export default DocumentsPage;
