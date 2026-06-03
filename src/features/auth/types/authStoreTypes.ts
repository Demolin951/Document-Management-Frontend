import type { AppUser } from "../../../shared/types/userTypes";

export type AuthState = {
    users: AppUser[];
    selectedUser: AppUser | null;
    isLoadingUsers: boolean;
    errorMessage: string | null;

    loadUsers: () => Promise<void>;
    selectUser: (userId: number) => void;
};