import { Info, Users } from "lucide-react";

import { changeAccessConfig } from "../config/changeAccessConfig";
import type { ChangeAccessCardProps } from "../types/documentAccessComponentTypes";

import AccessUserRow from "./AccessUserRow";

function ChangeAccessCard({
  accessUsers,
  isLoadingAccess,
  isActionLoading,
  onRoleChange,
  onRemoveAccess,
}: ChangeAccessCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Users size={18} strokeWidth={2.5} />
        </div>

        <h3 className="text-base font-bold text-slate-900">
          {changeAccessConfig.title}
        </h3>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="grid grid-cols-[1.1fr_1.2fr_1fr_0.8fr] bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
          <div>{changeAccessConfig.userColumn}</div>
          <div>{changeAccessConfig.usernameColumn}</div>
          <div>{changeAccessConfig.roleColumn}</div>
          <div className="text-right">{changeAccessConfig.actionsColumn}</div>
        </div>

        {isLoadingAccess ? (
          <div className="border-t border-slate-200 px-4 py-6 text-center text-sm font-semibold text-slate-500">
            {changeAccessConfig.loadingText}
          </div>
        ) : accessUsers.length === 0 ? (
          <div className="border-t border-slate-200 px-4 py-6 text-center text-sm font-semibold text-slate-500">
            {changeAccessConfig.emptyText}
          </div>
        ) : (
          accessUsers.map((accessUser) => (
            <AccessUserRow
              key={accessUser.id}
              accessUser={accessUser}
              isActionLoading={isActionLoading}
              onRoleChange={onRoleChange}
              onRemoveAccess={onRemoveAccess}
            />
          ))
        )}
      </div>

      <div className="mt-4 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
        <Info
          size={18}
          strokeWidth={2.5}
          className="mt-0.5 shrink-0 text-blue-600"
        />

        <p>{changeAccessConfig.ownerInfoText}</p>
      </div>
    </section>
  );
}

export default ChangeAccessCard;
