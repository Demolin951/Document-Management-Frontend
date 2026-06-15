import { UserPlus } from "lucide-react";

import Button from "../../../shared/components/ui/Button";
import { documentAccessConfig } from "../config/documentAccessModalConfig";
import { documentAccessRoleOptions } from "../config/documentAccessRoleConfig";
import type { AddUserAccessCardProps } from "../types/documentAccessComponentTypes";

function AddUserAccessCard({
  targetUserName,
  selectedRole,
  isAddingAccess,
  isAddAccessDisabled,
  onSubmit,
  onTargetUsernameChange,
  onRoleChange,
}: AddUserAccessCardProps) {
  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <UserPlus size={18} strokeWidth={2.5} />
        </div>
        <h3 className="text-base font-bold text-slate-900">Add User Access</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-slate-700">{documentAccessConfig.targetUsernameLabel}</label>
          <input type="text" value={targetUserName} onChange={onTargetUsernameChange} placeholder={documentAccessConfig.targetUsernamePlaceholder} disabled={isAddingAccess} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50" />
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700">{documentAccessConfig.roleLabel}</label>
          <select value={selectedRole} onChange={onRoleChange} disabled={isAddingAccess} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50">
            {documentAccessRoleOptions.map((roleOption) => (
              <option key={roleOption.value} value={roleOption.value}>{roleOption.label}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end pt-1">
          <Button type="submit" disabled={isAddAccessDisabled}>{isAddingAccess ? documentAccessConfig.addingAccessButtonText : documentAccessConfig.addAccessButtonText}</Button>
        </div>
      </div>
    </form>
  );
}

export default AddUserAccessCard;
