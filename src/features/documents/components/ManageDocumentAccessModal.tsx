import Modal from "../../../shared/components/ui/Modal";

import { documentAccessModalPanelClassName } from "../config/documentAccessModalConfig";
import { useManageDocumentAccessModal } from "../hooks/useManageDocumentAccessModal";
import type { ManageDocumentAccessModalProps } from "../types/documentAccessComponentTypes";

import AddUserAccessCard from "./AddUserAccessCard";
import ChangeAccessCard from "./ChangeAccessCard";
import RemoveAccessConfirmModal from "./RemoveAccessConfirmModal";
import TransferOwnershipCard from "./TransferOwnershipCard";
import TransferOwnershipConfirmModal from "./TransferOwnershipConfirmModal";
import TransferOwnershipSuccessModal from "./TransferOwnershipSuccessModal";

function ManageDocumentAccessModal(props: ManageDocumentAccessModalProps) {
  const { isOpen, document } = props;

  const {
    modalTitle,

    accessUserForRemove,
    isTransferOwnershipConfirmOpen,
    transferOwnershipSuccessMessage,
    setTransferOwnershipSuccessMessage,

    targetUserName,
    selectedRole,
    isAddingAccess,
    addAccessErrorMessage,

    newOwnerUsername,

    accessUsers,
    isLoadingAccess,
    isAccessActionLoading,
    accessManagementErrorMessage,

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
  } = useManageDocumentAccessModal(props);

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
