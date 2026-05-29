import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import UsersPage from "../pages/UserPage";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import DocumentsPage from "../pages/DocumentsPage";
import DocumentVersionsPage from "../pages/DocumentVersionsPage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
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
