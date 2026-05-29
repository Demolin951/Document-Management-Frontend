import Modal from "../../../components/ui/Modal";

import {
  documentAccessConfig,
  documentAccessModalPanelClassName,
} from "../config/documentAccessConfig";
import { useAddDocumentAccess } from "../hooks/useAddDocumentAccess";
import { useDocumentAccessManagement } from "../hooks/useDocumentAccessManagement";
import { useTransferOwnershipForm } from "../hooks/useTransferOwnershipForm";
import type {
  AddDocumentAccessFormSubmitEvent,
  AddDocumentAccessInputChangeEvent,
  AddDocumentAccessRole,
  AddDocumentAccessRoleChangeEvent,
  ManageDocumentAccessModalProps,
  TransferOwnershipInputChangeEvent,
} from "../types/documentAccessTypes";

import AddUserAccessCard from "./AddUserAccessCard";
import ChangeAccessCard from "./ChangeAccessCard";
import TransferOwnershipCard from "./TransferOwnershipCard";

function ManageDocumentAccessModal({
  isOpen,
  document,
  ownerUsername,
  onClose,
}: ManageDocumentAccessModalProps) {
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
    }
  }

  function handleNewOwnerUsernameChange(
    event: TransferOwnershipInputChangeEvent,
  ) {
    setNewOwnerUsername(event.target.value);
  }

  async function handleTransferOwnership() {
    const wasOwnershipTransferred = await transferOwnership(newOwnerUsername);

    if (wasOwnershipTransferred) {
      resetTransferOwnershipState();

      window.alert(
        "Ownership was transferred successfully. The current user is no longer the owner of this document.",
      );

      handleClose();
    }
  }

  return (
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
          onRoleChange={changeAccessRole}
          onRemoveAccess={removeAccess}
        />
      </div>
    </Modal>
  );
}

export default ManageDocumentAccessModal;
