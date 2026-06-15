import { useState } from "react";

import Modal from "../../../shared/components/ui/Modal";
import type { AccessUser } from "../../../shared/types/documentAccessTypes";

import {
  documentAccessConfig,
  documentAccessModalPanelClassName,
} from "../config/documentAccessModalConfig";
import { useAddDocumentAccess } from "../hooks/useAddDocumentAccess";
import { useDocumentAccessManagement } from "../hooks/useDocumentAccessManagement";
import { useTransferOwnershipForm } from "../hooks/useTransferOwnershipForm";
import type { ManageDocumentAccessModalProps } from "../types/documentAccessComponentTypes";
import type {
  AddDocumentAccessFormSubmitEvent,
  AddDocumentAccessInputChangeEvent,
  AddDocumentAccessRoleChangeEvent,
  TransferOwnershipInputChangeEvent,
} from "../types/documentAccessEventTypes";
import type { AddDocumentAccessRole } from "../types/documentAccessTypes";

import AddUserAccessCard from "./AddUserAccessCard";
import ChangeAccessCard from "./ChangeAccessCard";
import RemoveAccessConfirmModal from "./RemoveAccessConfirmModal";
import TransferOwnershipCard from "./TransferOwnershipCard";
import TransferOwnershipConfirmModal from "./TransferOwnershipConfirmModal";
import TransferOwnershipSuccessModal from "./TransferOwnershipSuccessModal";

function ManageDocumentAccessModal({
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

  const {
    targetUserName,
    selectedRole,
    isAddingAccess,
    addAccessErrorMessage,
    setTargetUserName,
    setSelectedRole,
    resetAddAccessState,
    submitAddAccess,
  } = useAddDocumentAccess();

  const {
    newOwnerUsername,
    isTransferOwnershipDisabled,
    setNewOwnerUsername,
    resetTransferOwnershipState,
  } = useTransferOwnershipForm();

  const {
    accessUsers,
    isLoadingAccess,
    isAccessActionLoading,
    accessManagementErrorMessage,
    reloadAccessUsers,
    changeAccessRole,
    removeAccess,
    transferOwnership,
  } = useDocumentAccessManagement(document, ownerUsername, isOpen);

  const modalTitle = document
    ? `${documentAccessConfig.modalTitle}: ${document.fileName}`
    : documentAccessConfig.modalTitle;

  const isAddAccessDisabled =
    isAddingAccess ||
    isAccessActionLoading ||
    !targetUserName.trim() ||
    !document ||
    !ownerUsername;

  const isTransferDisabled =
    isAccessActionLoading || isTransferOwnershipDisabled;

  function handleClose() {
    resetAddAccessState();
    resetTransferOwnershipState();
    setAccessUserForRemove(null);
    setIsTransferOwnershipConfirmOpen(false);
    onClose();
  }

  function handleTargetUsernameChange(
    event: AddDocumentAccessInputChangeEvent,
  ) {
    setTargetUserName(event.target.value);
  }

  function handleRoleChange(event: AddDocumentAccessRoleChangeEvent) {
    setSelectedRole(event.target.value as AddDocumentAccessRole);
  }

  async function handleAddAccessSubmit(
    event: AddDocumentAccessFormSubmitEvent,
  ) {
    event.preventDefault();

    const wasAccessAdded = await submitAddAccess(document, ownerUsername);

    if (wasAccessAdded) {
      await reloadAccessUsers();
      await notifyAccessChanged();
    }
  }

  async function handleAccessRoleChange(
    accessUser: Parameters<typeof changeAccessRole>[0],
    newRole: Parameters<typeof changeAccessRole>[1],
  ) {
    await changeAccessRole(accessUser, newRole);
    await notifyAccessChanged();
  }

  function handleRemoveAccess(accessUser: AccessUser) {
    setAccessUserForRemove(accessUser);
  }

  function closeRemoveAccessConfirmModal() {
    if (isAccessActionLoading) {
      return;
    }

    setAccessUserForRemove(null);
  }

  async function confirmRemoveAccess() {
    if (!accessUserForRemove) {
      return;
    }

    const wasAccessRemoved = await removeAccess(accessUserForRemove);

    if (wasAccessRemoved) {
      setAccessUserForRemove(null);
      await notifyAccessChanged();
    }
  }

  function handleNewOwnerUsernameChange(
    event: TransferOwnershipInputChangeEvent,
  ) {
    setNewOwnerUsername(event.target.value);
  }

  async function notifyAccessChanged() {
    await onAccessChanged?.();
  }

  function handleTransferOwnership() {
    if (!newOwnerUsername.trim()) {
      return;
    }

    setIsTransferOwnershipConfirmOpen(true);
  }

  function closeTransferOwnershipConfirmModal() {
    if (isAccessActionLoading) {
      return;
    }

    setIsTransferOwnershipConfirmOpen(false);
  }

  async function confirmTransferOwnership() {
    const trimmedNewOwnerUsername = newOwnerUsername.trim();

    const wasOwnershipTransferred = await transferOwnership(
      trimmedNewOwnerUsername,
    );

    if (wasOwnershipTransferred) {
      setIsTransferOwnershipConfirmOpen(false);
      resetTransferOwnershipState();

      await notifyAccessChanged();

      handleClose();

      setTransferOwnershipSuccessMessage(
        `Ownership was transferred successfully to ${trimmedNewOwnerUsername}. The current user is no longer the owner of this document.`,
      );
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        title={modalTitle}
        onClose={handleClose}
        panelClassName={documentAccessModalPanelClassName}
      >
        <div className="space-y-5">
          {addAccessErrorMessage && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {addAccessErrorMessage}
            </div>
          )}

          {accessManagementErrorMessage && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {accessManagementErrorMessage}
            </div>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            <AddUserAccessCard
              targetUserName={targetUserName}
              selectedRole={selectedRole}
              isAddingAccess={isAddingAccess}
              isAddAccessDisabled={isAddAccessDisabled}
              onSubmit={handleAddAccessSubmit}
              onTargetUsernameChange={handleTargetUsernameChange}
              onRoleChange={handleRoleChange}
            />

            <TransferOwnershipCard
              accessUsers={accessUsers}
              newOwnerUsername={newOwnerUsername}
              isTransferOwnershipDisabled={isTransferDisabled}
              isActionLoading={isAccessActionLoading}
              onNewOwnerUsernameChange={handleNewOwnerUsernameChange}
              onTransferOwnership={handleTransferOwnership}
            />
          </div>

          <ChangeAccessCard
            accessUsers={accessUsers}
            isLoadingAccess={isLoadingAccess}
            isActionLoading={isAccessActionLoading}
            onRoleChange={handleAccessRoleChange}
            onRemoveAccess={handleRemoveAccess}
          />
        </div>
      </Modal>

      <RemoveAccessConfirmModal
        isOpen={Boolean(accessUserForRemove)}
        accessUser={accessUserForRemove}
        isRemovingAccess={isAccessActionLoading}
        onClose={closeRemoveAccessConfirmModal}
        onConfirmRemoveAccess={confirmRemoveAccess}
      />

      <TransferOwnershipConfirmModal
        isOpen={isTransferOwnershipConfirmOpen}
        document={document}
        newOwnerUsername={newOwnerUsername}
        isTransferringOwnership={isAccessActionLoading}
        onClose={closeTransferOwnershipConfirmModal}
        onConfirmTransferOwnership={confirmTransferOwnership}
      />

      <TransferOwnershipSuccessModal
        isOpen={Boolean(transferOwnershipSuccessMessage)}
        message={transferOwnershipSuccessMessage}
        onClose={() => setTransferOwnershipSuccessMessage(null)}
      />
    </>
  );
}

export default ManageDocumentAccessModal;
