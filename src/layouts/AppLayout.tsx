import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { useEffect } from "react";
import { useAuthStore } from "../app/store/useAuthStore";
import type { AppLayoutProps } from "./types/appLayoutTypes";

function AppLayout({ children }: AppLayoutProps) {
  const loadUsers = useAuthStore((state) => state.loadUsers);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="ml-64 min-h-screen px-6 py-6 lg:px-8 lg:py-8">
        <div className="w-full max-w-none">
          <Topbar />
          <div className="mt-5">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
