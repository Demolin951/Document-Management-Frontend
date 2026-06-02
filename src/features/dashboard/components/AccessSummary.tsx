import { Edit3, Eye, Crown } from "lucide-react";

import type { DocumentListItem } from "../../documents/types/documentTypes";
import { getRoleCount } from "../utils/dashboardMappers";

export type AccessSummaryProps = {
  documents: DocumentListItem[];
};

function AccessSummary({ documents }: AccessSummaryProps) {
  const roleSummaryItems = [
    {
      label: "Owner",
      value: getRoleCount(documents, "Owner"),
      icon: Crown,
      iconBgClass: "bg-blue-50",
      iconTextClass: "text-blue-600",
      subtitle: "Owned documents",
    },
    {
      label: "Editor",
      value: getRoleCount(documents, "Editor"),
      icon: Edit3,
      iconBgClass: "bg-amber-50",
      iconTextClass: "text-amber-600",
      subtitle: "Editable documents",
    },
    {
      label: "Viewer",
      value: getRoleCount(documents, "Viewer"),
      icon: Eye,
      iconBgClass: "bg-slate-100",
      iconTextClass: "text-slate-600",
      subtitle: "View-only documents",
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Access Summary
      </h2>

      <div className="space-y-2">
        {roleSummaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl px-2 py-2 transition-colors hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.iconBgClass} ${item.iconTextClass}`}
                >
                  <Icon size={16} strokeWidth={2.4} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.label}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AccessSummary;
