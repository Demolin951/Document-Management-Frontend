import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import AppLayout from "../layouts/AppLayout";
import UploadDocumentTopbarAction from "./wrappers/UploadDocumentTopbarAction";
import DashboardPage from "../pages/DashboardPage";
import DocumentVersionsPage from "../pages/DocumentVersionsPage";
import DocumentsPage from "../pages/DocumentsPage";
import UsersPage from "../pages/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout topbarActions={<UploadDocumentTopbarAction />}>
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
