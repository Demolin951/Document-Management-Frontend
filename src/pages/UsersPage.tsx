import SectionCard from "../components/ui/SectionCard";
import { useAuthStore } from "../app/store/useAuthStore";
import AddUserModal from "../features/users/components/AddUserModal";
import DeleteUserConfirmModal from "../features/users/components/DeleteUserConfirmModal";
import UsersTable from "../features/users/components/UsersTable";
import { useUsersManagement } from "../features/users/hooks/useUsersManagement";

function UsersPage() {
  const selectedUser = useAuthStore((state) => state.selectedUser);
  const isAdmin = selectedUser?.name.toLowerCase() === "admin";

  const {
    users,
    isLoadingUsers,
    usersErrorMessage,

    isAddUserModalOpen,
    newUsername,
    createUserErrorMessage,
    isCreatingUser,

    selectedUserForDelete,
    deleteUserErrorMessage,
    isDeletingUser,

    openAddUserModal,
    closeAddUserModal,
    setNewUsername,
    createNewUser,

    openDeleteUserModal,
    closeDeleteUserModal,
    deleteSelectedUser,
  } = useUsersManagement(selectedUser?.name);

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <SectionCard>
          <div className="px-6 py-10 text-center">
            <p className="text-sm font-semibold text-red-700">Access denied</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Only admin can manage users.
            </p>
          </div>
        </SectionCard>
      </div>
    );
  }

  if (isLoadingUsers) {
    return (
      <div className="space-y-6">
        <SectionCard>
          <div className="px-6 py-10 text-center">
            <p className="text-sm font-semibold text-slate-500">
              Loading users...
            </p>
          </div>
        </SectionCard>
      </div>
    );
  }

  if (usersErrorMessage) {
    return (
      <div className="space-y-6">
        <SectionCard>
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {usersErrorMessage}
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <SectionCard>
          <UsersTable
            users={users}
            onOpenAddUserModal={openAddUserModal}
            onOpenDeleteUserModal={openDeleteUserModal}
          />
        </SectionCard>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        username={newUsername}
        errorMessage={createUserErrorMessage}
        isCreatingUser={isCreatingUser}
        onUsernameChange={setNewUsername}
        onClose={closeAddUserModal}
        onCreateUser={createNewUser}
      />

      <DeleteUserConfirmModal
        isOpen={Boolean(selectedUserForDelete)}
        user={selectedUserForDelete}
        errorMessage={deleteUserErrorMessage}
        isDeletingUser={isDeletingUser}
        onClose={closeDeleteUserModal}
        onDeleteUser={deleteSelectedUser}
      />
    </>
  );
}

export default UsersPage;
