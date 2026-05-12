import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="ml-64 min-h-screen px-6 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          <Topbar />
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
