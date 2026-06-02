import type { AppUser } from "../../../shared/types/userTypes";

export type ManagedUser = AppUser;

export type CreateUserRequest = {
  userName: string;
};

export type UsersTableProps = {
  users: ManagedUser[];
  onOpenAddUserModal: () => void;
  onOpenDeleteUserModal: (user: ManagedUser) => void;
};

export type UserTableRowProps = {
  user: ManagedUser;
  onOpenDeleteUserModal: (user: ManagedUser) => void;
};

export type AddUserModalProps = {
  isOpen: boolean;
  username: string;
  errorMessage: string | null;
  isCreatingUser: boolean;
  onUsernameChange: (username: string) => void;
  onClose: () => void;
  onCreateUser: () => Promise<void>;
};

export type DeleteUserConfirmModalProps = {
  isOpen: boolean;
  user: ManagedUser | null;
  errorMessage: string | null;
  isDeletingUser: boolean;
  onClose: () => void;
  onDeleteUser: () => Promise<void>;
};

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
