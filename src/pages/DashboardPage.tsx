import SectionCard from "../components/ui/SectionCard";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import AccessSummary from "../features/dashboard/components/AccessSummary";
import DashboardStats from "../features/dashboard/components/DashboardStats";
import RecentDocuments from "../features/dashboard/components/RecentDocuments";
import { useDashboardData } from "../features/dashboard/hooks/useDashboardData";
import {
  buildDashboardStats,
  getRecentDocuments,
} from "../features/dashboard/utils/dashboardMappers";

function DashboardPage() {
  const selectedUser = useAuthStore((state) => state.selectedUser);

  const {
    documents,
    usersCount,
    sharedToOthersCount,
    isLoadingDashboard,
    dashboardErrorMessage,
  } = useDashboardData(selectedUser?.name);

  if (!selectedUser) {
    return (
      <SectionCard>
        <div className="px-6 py-10 text-center">
          <p className="text-sm font-semibold text-slate-500">
            Select a user in the sidebar to load dashboard data.
          </p>
        </div>
      </SectionCard>
    );
  }

  if (isLoadingDashboard) {
    return (
      <SectionCard>
        <div className="px-6 py-10 text-center">
          <p className="text-sm font-semibold text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </SectionCard>
    );
  }

  if (dashboardErrorMessage) {
    return (
      <SectionCard>
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {dashboardErrorMessage}
        </div>
      </SectionCard>
    );
  }

  const stats = buildDashboardStats(
    documents,
    usersCount,
    sharedToOthersCount,
  );
  const recentDocuments = getRecentDocuments(documents);

  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard>
          <RecentDocuments documents={recentDocuments} />
        </SectionCard>
        <SectionCard>
          <AccessSummary documents={documents} />
        </SectionCard>
      </div>
    </div>
  );
}

export default DashboardPage;
