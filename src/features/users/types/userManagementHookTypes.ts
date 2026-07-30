import type { ManagedUser } from "./userManagementTypes";

export type UseUsersManagementResult = {
  users: ManagedUser[];
  isLoadingUsers: boolean;
  usersErrorMessage: string | null;

  isAddUserModalOpen: boolean;
  newUsername: string;
  createUserErrorMessage: string | null;
  isCreatingUser: boolean;

  selectedUserForDelete: ManagedUser | null;
  deleteUserErrorMessage: string | null;
  isDeletingUser: boolean;

  loadManagedUsers: () => Promise<void>;
  openAddUserModal: () => void;
  closeAddUserModal: () => void;
  setNewUsername: (username: string) => void;
  createNewUser: () => Promise<void>;

  openDeleteUserModal: (user: ManagedUser) => void;
  closeDeleteUserModal: () => void;
  deleteSelectedUser: () => Promise<void>;
};
