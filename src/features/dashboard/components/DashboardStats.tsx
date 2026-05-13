import { FileText, Users, Upload, RefreshCcw } from "lucide-react";
import StatCard from "../../../components/ui/StatCard";

const stats = [
  {
    title: "Total Documents",
    value: 24,
    subtitle: "All time",
    icon: FileText,
  },
  {
    title: "Total Users",
    value: 12,
    subtitle: "All users",
    icon: Users,
  },
  {
    title: "Latest Uploads",
    value: 8,
    subtitle: "This week",
    icon: Upload,
  },
  {
    title: "Ownership transfers",
    value: 3,
    subtitle: "This month",
    icon: RefreshCcw,
  },
];

function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}

export default DashboardStats;
