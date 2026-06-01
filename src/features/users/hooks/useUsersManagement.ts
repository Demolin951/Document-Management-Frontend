import { useEffect, useState } from "react";

import { useAuthStore } from "../../auth/store/useAuthStore";
import {
  createManagedUser,
  deleteManagedUser,
  getManagedUsers,
} from "../api/usersManagementApi";
import type {
  ManagedUser,
  UseUsersManagementResult,
} from "../types/userManagementTypes";

function getReadableErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export function useUsersManagement(
  currentUsername: string | undefined,
): UseUsersManagementResult {
  const reloadAuthUsers = useAuthStore((state) => state.loadUsers);

  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [usersErrorMessage, setUsersErrorMessage] = useState<string | null>(
    null,
  );

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [createUserErrorMessage, setCreateUserErrorMessage] = useState<
    string | null
  >(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const [selectedUserForDelete, setSelectedUserForDelete] =
    useState<ManagedUser | null>(null);
  const [deleteUserErrorMessage, setDeleteUserErrorMessage] = useState<
    string | null
  >(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  async function loadManagedUsers() {
    setIsLoadingUsers(true);
    setUsersErrorMessage(null);

    try {
      const loadedUsers = await getManagedUsers();

      setUsers(loadedUsers);
    } catch (error) {
      setUsersErrorMessage(
        getReadableErrorMessage(error, "Users could not be loaded."),
      );
    } finally {
      setIsLoadingUsers(false);
    }
  }

  function openAddUserModal() {
    setIsAddUserModalOpen(true);
    setNewUsername("");
    setCreateUserErrorMessage(null);
  }

  function closeAddUserModal() {
    if (isCreatingUser) {
      return;
    }

    setIsAddUserModalOpen(false);
    setNewUsername("");
    setCreateUserErrorMessage(null);
  }

  async function createNewUser() {
    const trimmedUsername = newUsername.trim();

    if (!currentUsername) {
      setCreateUserErrorMessage("No current user selected.");
      return;
    }

    if (!trimmedUsername) {
      setCreateUserErrorMessage("Username is required.");
      return;
    }

    if (trimmedUsername.toLowerCase() === "admin") {
      setCreateUserErrorMessage("Admin user already exists.");
      return;
    }

    setIsCreatingUser(true);
    setCreateUserErrorMessage(null);

    try {
      await createManagedUser(trimmedUsername, currentUsername);
      await loadManagedUsers();
      await reloadAuthUsers();

      setIsAddUserModalOpen(false);
      setNewUsername("");
    } catch (error) {
      setCreateUserErrorMessage(
        getReadableErrorMessage(error, "User could not be created."),
      );
    } finally {
      setIsCreatingUser(false);
    }
  }

  function openDeleteUserModal(user: ManagedUser) {
    setSelectedUserForDelete(user);
    setDeleteUserErrorMessage(null);
  }

  function closeDeleteUserModal() {
    if (isDeletingUser) {
      return;
    }

    setSelectedUserForDelete(null);
    setDeleteUserErrorMessage(null);
  }

  async function deleteSelectedUser() {
    if (!currentUsername) {
      setDeleteUserErrorMessage("No current user selected.");
      return;
    }

    if (!selectedUserForDelete) {
      setDeleteUserErrorMessage("No user selected.");
      return;
    }

    if (selectedUserForDelete.name.toLowerCase() === "admin") {
      setDeleteUserErrorMessage("Admin user cannot be deleted.");
      return;
    }

    setIsDeletingUser(true);
    setDeleteUserErrorMessage(null);

    try {
      await deleteManagedUser(selectedUserForDelete.id, currentUsername);
      await loadManagedUsers();
      await reloadAuthUsers();

      setSelectedUserForDelete(null);
    } catch (error) {
      setDeleteUserErrorMessage(
        getReadableErrorMessage(error, "User could not be deleted."),
      );
    } finally {
      setIsDeletingUser(false);
    }
  }

  useEffect(() => {
    void loadManagedUsers();
  }, []);

  return {
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

    loadManagedUsers,
    openAddUserModal,
    closeAddUserModal,
    setNewUsername,
    createNewUser,

    openDeleteUserModal,
    closeDeleteUserModal,
    deleteSelectedUser,
  };
}
