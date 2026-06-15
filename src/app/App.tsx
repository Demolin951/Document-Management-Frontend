import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { useSelectedUserStore } from "./store/useSelectedUserStore";
import UploadDocumentAction from "../features/documents/wrappers/UploadDocumentAction";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import DocumentVersionsPage from "../pages/DocumentVersionsPage";
import DocumentsPage from "../pages/DocumentsPage";
import UsersPage from "../pages/UsersPage";

function App() {
  const selectedUser = useSelectedUserStore((state) => state.selectedUser);

  return (
    <BrowserRouter>
      <AppLayout
        topbarActions={<UploadDocumentAction selectedUsername={selectedUser?.name} />}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/versions" element={<DocumentVersionsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
