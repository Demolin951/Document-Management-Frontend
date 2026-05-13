import DashboardListItem from "../../../components/dashboard/DashboardListItem";
import { MoveRight, RefreshCcw, Upload, UserPlus } from "lucide-react";

const RecentActivities = [
  {
    description: "max uploaded new version of Project Plan.pdf",
    timestamp: "09.05.2026 14:32",
    icon: Upload,
  },
  {
    description: "anna was added to Project Plan.pdf",
    timestamp: "09.05.2026 13:10",
    icon: UserPlus,
  },
  {
    description: "Ownership of Architecture.pdf transfered",
    timestamp: "10.05.2026 13:10",
    icon: RefreshCcw,
  },
];

function RecentActivity() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Recent Activity
      </h2>

      <div className="space-y-1">
        {RecentActivities.map((activity) => (
          <DashboardListItem
            key={activity.description}
            title={activity.description}
            icon={activity.icon}
            subtitle={activity.timestamp}
            iconBgClass="bg-blue-50"
            iconTextClass="text-blue-600"
          />
        ))}
      </div>

      <button className="mt-4 flex items-center gap-2 self-start text-sm font-semibold text-blue-600 hover:text-blue-700">
        <span>View audit log</span>
        <MoveRight size={16} strokeWidth={2.5} className="mt-0.5" />
      </button>
    </div>
  );
}

export default RecentActivity;
