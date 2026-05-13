type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ElementType;
};

function StatCard({ title, value, subtitle, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-2x1 border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3x1 font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>
    </article>
  );
}

export default StatCard;
