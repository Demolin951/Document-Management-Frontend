import type { AppUser } from "../../shared/types/userTypes";

export type SelectedUserState = {
  users: AppUser[];
  selectedUser: AppUser | null;
  isLoadingUsers: boolean;
  errorMessage: string | null;

  loadUsers: () => Promise<void>;
  selectUser: (userId: number) => void;
};
