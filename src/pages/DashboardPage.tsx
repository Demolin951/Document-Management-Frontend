import SectionCard from "../components/ui/SectionCard";
import DashboardStats from "../features/dashboard/components/DashboardStats";
import RecentActivity from "../features/dashboard/components/RecentActivity";
import RecentDocuments from "../features/dashboard/components/RecentDocuments";

function DashboardPage() {
  return (
    <div className="space-y-6">

        <DashboardStats />


      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard>
          <RecentDocuments />
        </SectionCard>
        <SectionCard>
          <RecentActivity />
        </SectionCard>
      </div>
    </div>
  );
}

export default DashboardPage;
