import { Lock } from "lucide-react";

import { changeAccessConfig } from "../config/changeAccessConfig";
import { documentAccessRoleOptions } from "../config/documentAccessRoleConfig";
import type { AddDocumentAccessRole } from "../types/documentAccessApiTypes";
import type { AccessUserRowProps } from "../types/documentAccessComponentTypes";

function AccessUserRow({
  accessUser,
  isActionLoading,
  onRoleChange,
  onRemoveAccess,
}: AccessUserRowProps) {
  const isOwner = accessUser.role === "Owner";

  return (
    <div
      className={`grid grid-cols-[1.1fr_1.2fr_1fr_0.8fr] items-center border-t border-slate-200 px-4 py-3 text-sm ${
        isOwner ? "bg-blue-50/70" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          {accessUser.name.charAt(0).toUpperCase()}
        </div>

        <span className="font-semibold text-slate-900">{accessUser.name}</span>
      </div>

      <div className="font-medium text-slate-600">{accessUser.username}</div>

      <div>
        {isOwner ? (
          <span className="font-semibold text-slate-700">Owner</span>
        ) : (
          <select
            value={accessUser.role}
            disabled={isActionLoading}
            onChange={(event) =>
              onRoleChange(
                accessUser,
                event.target.value as AddDocumentAccessRole,
              )
            }
            className="w-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
          >
            {documentAccessRoleOptions.map((roleOption) => (
              <option key={roleOption.value} value={roleOption.value}>
                {roleOption.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex justify-end">
        {isOwner ? (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Lock size={15} strokeWidth={2.5} />
            {changeAccessConfig.lockedText}
          </span>
        ) : (
          <button
            type="button"
            disabled={isActionLoading}
            onClick={() => onRemoveAccess(accessUser)}
            className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {changeAccessConfig.removeButtonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default AccessUserRow;
