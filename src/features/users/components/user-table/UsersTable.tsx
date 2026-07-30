import { UserPlus, Users } from "lucide-react";

import Button from "../../../../shared/components/ui/Button";
import DataTable from "../../../../shared/components/ui/DataTable";
import EmptyDataTableState from "../../../../shared/components/ui/DataTableEmptyState";
import { usersTableColumns } from "../../config/usersTableConfig";
import type { UsersTableProps } from "../../types/userManagementComponentTypes";

import UserTableRow from "./UserTableRow";

function UsersTable({
  users,
  onOpenAddUserModal,
  onOpenDeleteUserModal,
}: UsersTableProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Users</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Manage application users.
          </p>
        </div>

        <Button onClick={onOpenAddUserModal} className="flex items-center gap-2">
          <UserPlus size={16} strokeWidth={2.4} />
          Add User
        </Button>
      </div>

      <DataTable
        columns={usersTableColumns}
        emptyState={
          <EmptyDataTableState
            icon={Users}
            title="No users found"
            description="Create the first user to start managing access."
          />
        }
        footer={
          <p className="text-sm font-semibold text-slate-500">
            Showing {users.length} {users.length === 1 ? "user" : "users"}
          </p>
        }
      >
        {users.map((user) => (
          <UserTableRow
            key={user.id}
            user={user}
            onOpenDeleteUserModal={onOpenDeleteUserModal}
          />
        ))}
      </DataTable>
    </div>
  );
}

export default UsersTable;
