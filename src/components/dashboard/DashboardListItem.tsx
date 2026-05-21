import type { DashboardListItemProps } from "./types/dashboardListItemTypes";

function DashboardListItem({
  icon: Icon,
  title,
  subtitle,
  iconBgClass,
  iconTextClass,
  rightContent,
}: DashboardListItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-slate-50">
      <div className="flex flex-1 items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBgClass} ${iconTextClass}`}
        >
          <Icon size={16} strokeWidth={2.4} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
}

export default DashboardListItem;
