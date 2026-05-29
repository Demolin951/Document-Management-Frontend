import Modal from "../../../components/ui/Modal";

import {
  documentAccessConfig,
  documentAccessModalPanelClassName,
} from "../config/documentAccessConfig";
import { useAddDocumentAccess } from "../hooks/useAddDocumentAccess";
import { useDocumentAccessPreview } from "../hooks/useDocumentAccessPreview";
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
    submitTransferOwnership,
  } = useTransferOwnershipForm();

  const { accessUsers, handleAccessRoleChange, handleRemoveAccess } =
    useDocumentAccessPreview(document, ownerUsername);

  const modalTitle = document
    ? `${documentAccessConfig.modalTitle}: ${document.fileName}`
    : documentAccessConfig.modalTitle;

  const isAddAccessDisabled =
    isAddingAccess || !targetUserName.trim() || !document || !ownerUsername;

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

    await submitAddAccess(document, ownerUsername);
  }

  function handleNewOwnerUsernameChange(
    event: TransferOwnershipInputChangeEvent,
  ) {
    setNewOwnerUsername(event.target.value);
  }

  function handleTransferOwnership() {
    submitTransferOwnership(document);
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
            newOwnerUsername={newOwnerUsername}
            isTransferOwnershipDisabled={isTransferOwnershipDisabled}
            onNewOwnerUsernameChange={handleNewOwnerUsernameChange}
            onTransferOwnership={handleTransferOwnership}
          />
        </div>

        <ChangeAccessCard
          accessUsers={accessUsers}
          onRoleChange={handleAccessRoleChange}
          onRemoveAccess={handleRemoveAccess}
        />
      </div>
    </Modal>
  );
}

export default ManageDocumentAccessModal;
