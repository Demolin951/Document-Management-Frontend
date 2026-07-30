import { Lock, Trash2, User } from "lucide-react";

import DataTableRow from "../../../../shared/components/ui/DataTableRow";
import { usersTableColumns } from "../../config/usersTableConfig";
import type { UserTableRowProps } from "../../types/userManagementComponentTypes";

function UserTableRow({ user, onOpenDeleteUserModal }: UserTableRowProps) {
  const isAdmin = user.name.toLowerCase() === "admin";

  return (
    <DataTableRow columns={usersTableColumns}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <User size={18} strokeWidth={2.5} />
        </div>

        <span className="font-semibold text-slate-900">{user.name}</span>
      </div>

      <div className="flex justify-end">
        {isAdmin ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Lock size={16} strokeWidth={2.4} />
            <span>Locked</span>
          </div>
        ) : (
          <button
            type="button"
            title="Delete user"
            onClick={() => onOpenDeleteUserModal(user)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} strokeWidth={2.4} />
          </button>
        )}
      </div>
    </DataTableRow>
  );
}

export default UserTableRow;
