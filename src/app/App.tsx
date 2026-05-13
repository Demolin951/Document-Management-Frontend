import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
