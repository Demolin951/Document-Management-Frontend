import { useState } from "react";

import type { AccessUser } from "../../../shared/types/documentAccessTypes";

import { documentAccessConfig } from "../config/documentAccessModalConfig";
import { useAddDocumentAccess } from "./useAddDocumentAccess";
import { useDocumentAccessManagement } from "./useDocumentAccessManagement";
import { useTransferOwnershipForm } from "./useTransferOwnershipForm";
import type { ManageDocumentAccessModalProps } from "../types/documentAccessComponentTypes";
import type {
  AddDocumentAccessFormSubmitEvent,
  AddDocumentAccessInputChangeEvent,
  AddDocumentAccessRoleChangeEvent,
  TransferOwnershipInputChangeEvent,
} from "../types/documentAccessEventTypes";
import type { AddDocumentAccessRole } from "../types/documentAccessTypes";

export function useManageDocumentAccessModal({
  isOpen,
  document,
  ownerUsername,
  onClose,
  onAccessChanged,
}: ManageDocumentAccessModalProps) {
  const [accessUserForRemove, setAccessUserForRemove] =
    useState<AccessUser | null>(null);
  const [isTransferOwnershipConfirmOpen, setIsTransferOwnershipConfirmOpen] =
    useState(false);
  const [transferOwnershipSuccessMessage, setTransferOwnershipSuccessMessage] =
    useState<string | null>(null);

  const addAccess = useAddDocumentAccess();
  const transferOwnershipForm = useTransferOwnershipForm();
  const accessManagement = useDocumentAccessManagement(
    document,
    ownerUsername,
    isOpen,
  );

  const modalTitle = document
    ? `${documentAccessConfig.modalTitle}: ${document.fileName}`
    : documentAccessConfig.modalTitle;

  const isAddAccessDisabled =
    addAccess.isAddingAccess ||
    accessManagement.isAccessActionLoading ||
    !addAccess.targetUserName.trim() ||
    !document ||
    !ownerUsername;

  const isTransferDisabled =
    accessManagement.isAccessActionLoading ||
    transferOwnershipForm.isTransferOwnershipDisabled;

  async function notifyAccessChanged() {
    await onAccessChanged?.();
  }

  function handleClose() {
    addAccess.resetAddAccessState();
    transferOwnershipForm.resetTransferOwnershipState();
    setAccessUserForRemove(null);
    setIsTransferOwnershipConfirmOpen(false);
    onClose();
  }

  function handleTargetUsernameChange(
    event: AddDocumentAccessInputChangeEvent,
  ) {
    addAccess.setTargetUserName(event.target.value);
  }

  function handleRoleChange(event: AddDocumentAccessRoleChangeEvent) {
    addAccess.setSelectedRole(event.target.value as AddDocumentAccessRole);
  }

  async function handleAddAccessSubmit(
    event: AddDocumentAccessFormSubmitEvent,
  ) {
    event.preventDefault();

    const wasAccessAdded = await addAccess.submitAddAccess(
      document,
      ownerUsername,
    );

    if (wasAccessAdded) {
      await accessManagement.reloadAccessUsers();
      await notifyAccessChanged();
    }
  }

  async function handleAccessRoleChange(
    accessUser: AccessUser,
    newRole: AddDocumentAccessRole,
  ) {
    await accessManagement.changeAccessRole(accessUser, newRole);
    await notifyAccessChanged();
  }

  function handleRemoveAccess(accessUser: AccessUser) {
    setAccessUserForRemove(accessUser);
  }

  function closeRemoveAccessConfirmModal() {
    if (accessManagement.isAccessActionLoading) {
      return;
    }

    setAccessUserForRemove(null);
  }

  async function confirmRemoveAccess() {
    if (!accessUserForRemove) {
      return;
    }

    const wasAccessRemoved =
      await accessManagement.removeAccess(accessUserForRemove);

    if (wasAccessRemoved) {
      setAccessUserForRemove(null);
      await notifyAccessChanged();
    }
  }

  function handleNewOwnerUsernameChange(
    event: TransferOwnershipInputChangeEvent,
  ) {
    transferOwnershipForm.setNewOwnerUsername(event.target.value);
  }

  function handleTransferOwnership() {
    if (!transferOwnershipForm.newOwnerUsername.trim()) {
      return;
    }

    setIsTransferOwnershipConfirmOpen(true);
  }

  function closeTransferOwnershipConfirmModal() {
    if (accessManagement.isAccessActionLoading) {
      return;
    }

    setIsTransferOwnershipConfirmOpen(false);
  }

  async function confirmTransferOwnership() {
    const trimmedNewOwnerUsername =
      transferOwnershipForm.newOwnerUsername.trim();

    const wasOwnershipTransferred =
      await accessManagement.transferOwnership(trimmedNewOwnerUsername);

    if (wasOwnershipTransferred) {
      setIsTransferOwnershipConfirmOpen(false);
      transferOwnershipForm.resetTransferOwnershipState();

      await notifyAccessChanged();

      handleClose();

      setTransferOwnershipSuccessMessage(
        `Ownership was transferred successfully to ${trimmedNewOwnerUsername}. The current user is no longer the owner of this document.`,
      );
    }
  }

  return {
    modalTitle,

    accessUserForRemove,
    isTransferOwnershipConfirmOpen,
    transferOwnershipSuccessMessage,
    setTransferOwnershipSuccessMessage,

    targetUserName: addAccess.targetUserName,
    selectedRole: addAccess.selectedRole,
    isAddingAccess: addAccess.isAddingAccess,
    addAccessErrorMessage: addAccess.addAccessErrorMessage,

    newOwnerUsername: transferOwnershipForm.newOwnerUsername,

    accessUsers: accessManagement.accessUsers,
    isLoadingAccess: accessManagement.isLoadingAccess,
    isAccessActionLoading: accessManagement.isAccessActionLoading,
    accessManagementErrorMessage:
      accessManagement.accessManagementErrorMessage,

    isAddAccessDisabled,
    isTransferDisabled,

    handleClose,
    handleTargetUsernameChange,
    handleRoleChange,
    handleAddAccessSubmit,
    handleAccessRoleChange,
    handleRemoveAccess,
    closeRemoveAccessConfirmModal,
    confirmRemoveAccess,
    handleNewOwnerUsernameChange,
    handleTransferOwnership,
    closeTransferOwnershipConfirmModal,
    confirmTransferOwnership,
  };
}
