import type { ManagedUser } from "./userManagementTypes";

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
