import { useSelectedUserStore } from "../app/store/useSelectedUserStore";
import Panel from "../shared/components/ui/Panel";
import DocumentsTable from "../features/documents/components/DocumentTable";

function DocumentsPage() {
  const selectedUser = useSelectedUserStore((state) => state.selectedUser);
  const username = selectedUser?.name;

  return (
    <div className="space-y-6">
      <Panel>
        <DocumentsTable username={username} />
      </Panel>
    </div>
  );
}

export default DocumentsPage;
