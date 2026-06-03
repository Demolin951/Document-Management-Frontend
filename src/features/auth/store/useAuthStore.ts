import { create } from "zustand";
 
import { getUsers } from "../api/userApi";
import type { AuthState } from "../types/authStoreTypes";
import { clearSavedSelectedUserId, getSavedSelectedUserId, saveSelectedUserId } from "../utils/authStorageUtils";

export const useAuthStore = create<AuthState>((set, get) => ({
  users: [],
  selectedUser: null,
  isLoadingUsers: false,
  errorMessage: null,
 
  loadUsers: async () => {
    set({
      isLoadingUsers: true,
      errorMessage: null,
    });
 
    try {
      const users = await getUsers();
      const savedSelectedUserId = getSavedSelectedUserId();
 
      const savedSelectedUser =
        users.find((user) => user.id === savedSelectedUserId) ?? null;
 
      const selectedUser = savedSelectedUser ?? users[0] ?? null;
 
      if (!savedSelectedUser && selectedUser) {
        saveSelectedUserId(selectedUser.id);
      }
 
      if (!selectedUser) {
        clearSavedSelectedUserId();
      }
 
      set({
        users,
        selectedUser,
        isLoadingUsers: false,
      });
    } catch {
      set({
        users: [],
        selectedUser: null,
        errorMessage: "Users could not be loaded.",
        isLoadingUsers: false,
      });
    }
  },
 
  selectUser: (userId: number) => {
    const user = get().users.find((user) => user.id === userId);
 
    if (!user) {
      return;
    }
 
    saveSelectedUserId(user.id);
 
    set({
      selectedUser: user,
    });
  },
}));