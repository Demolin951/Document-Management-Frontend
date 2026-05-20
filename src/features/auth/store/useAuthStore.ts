import {create} from "zustand";
import { getUsers } from "../api/userApi";
import type { AppUser } from "../types/authTypes";

type AuthState = {
    users: AppUser[];
    selectedUser: AppUser | null;
    isLoadingUsers: boolean;
    errorMessage: string | null;

    loadUsers: () => Promise<void>;
    selectUser: (userId: number) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    users: [],
    selectedUser: null,
    isLoadingUsers: false,
    errorMessage: null,

    loadUsers: async() => {
        set({
            isLoadingUsers: true,
            errorMessage: null,
        });

    try {
        const users = await getUsers();

        set({
            users,
            selectedUser: users[0] ?? null,
            isLoadingUsers: false,
        });
    }catch{
        set({
            errorMessage: "Users could not be loaded.",
            isLoadingUsers: false,
        });
    }    
    },

    selectUser: (userId: number) => {
        const user = get().users.find((user) => user.id === userId);

        if(!user){
            return;
        }

        set({
            selectedUser: user,
        });
    },
}))