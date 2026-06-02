import StatCard from "../../../components/ui/StatCard";
import type { DashboardStat } from "../types/dashboardTypes";

export type DashboardStatsProps = {
  stats: DashboardStat[];
};

function DashboardStats({ stats }: DashboardStatsProps) {
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
