import { useEffect } from "react";

import { useSelectedUserStore } from "../app/store/useSelectedUserStore";
import AppSidebar from "./components/AppSidebar";
import Topbar from "./components/Topbar";
import type { AppLayoutProps } from "./types/appLayoutTypes";

function AppLayout({ children, topbarActions }: AppLayoutProps) {
  const loadUsers = useSelectedUserStore((state) => state.loadUsers);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className="min-h-screen bg-slate-100">
      <AppSidebar />

      <main className="ml-64 min-h-screen px-6 py-6 lg:px-8 lg:py-8">
        <div className="w-full max-w-none">
          <Topbar actions={topbarActions} />
          <div className="mt-5">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
