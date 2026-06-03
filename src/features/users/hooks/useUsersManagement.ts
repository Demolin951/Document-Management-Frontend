import { useEffect, useState } from "react";

import { useSelectedUserStore } from "../../../app/store/useSelectedUserStore";
import { getUsers } from "../../../shared/api/usersApi";
import { getReadableErrorMessage } from "../../../shared/utils/errorUtils";
import {
  createManagedUser,
  deleteManagedUser,
} from "../api/usersManagementApi";
import type {
  ManagedUser,
  UseUsersManagementResult,
} from "../types/userManagementTypes";

export function useUsersManagement(
  currentUsername: string | undefined,
): UseUsersManagementResult {
  const reloadSelectedUsers = useSelectedUserStore((state) => state.loadUsers);

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
      const loadedUsers = await getUsers();

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
      await reloadSelectedUsers();

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
      await reloadSelectedUsers();

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
