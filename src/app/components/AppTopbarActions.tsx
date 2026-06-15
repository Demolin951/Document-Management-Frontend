import { useSelectedUserStore } from "../store/useSelectedUserStore";
import UploadDocumentAction from "../../features/documents/wrappers/UploadDocumentAction";

function AppTopbarActions() {
  const selectedUser = useSelectedUserStore((state) => state.selectedUser);

  return <UploadDocumentAction selectedUsername={selectedUser?.name} />;
}

export default AppTopbarActions;
