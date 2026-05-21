import DashboardListItem from "./DashboardListItem";
import { MoveRight } from "lucide-react";
import { RecentActivities } from "../data/dashboardMock";
import { getActivityIcon } from "../utils/activityIconMap";

function RecentActivity() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Recent Activity
      </h2>

      <div className="space-y-1">
        {RecentActivities.map((activity) => (
          <DashboardListItem
            key={activity.id}
            title={activity.message}
            icon={getActivityIcon(activity.type)}
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
