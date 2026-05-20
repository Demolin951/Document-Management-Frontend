import type { LucideIcon } from "lucide-react";

type EmptyDataTableStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function EmptyDataTableState({
  icon: Icon,
  title,
  description,
}: EmptyDataTableStateProps) {
  return (
    <div className="flex min-h[420px] flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <Icon size={28} strokeWidth={2.4} />
      </div>

      <h2 className="text-base font-bold text-slate-900">{title}</h2>

      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
    </div>
  );
}

export default EmptyDataTableState;
