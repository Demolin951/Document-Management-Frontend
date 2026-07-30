import type { AccessUser } from "../../../shared/types/documentAccessTypes";
import type { DocumentListItem } from "../../../shared/types/documentTypes";

import type { AddDocumentAccessRole } from "./documentAccessTypes";
import type {
  AddDocumentAccessFormSubmitHandler,
  AddDocumentAccessInputChangeHandler,
  AddDocumentAccessRoleChangeHandler,
  TransferOwnershipInputChangeHandler,
} from "./documentAccessEventTypes";

export type ManageDocumentAccessModalProps = {
  isOpen: boolean;
  document: DocumentListItem | null;
  ownerUsername: string | undefined;
  onClose: () => void;
  onAccessChanged?: () => Promise<void> | void;
};

export type DocumentAccessConfig = {
  modalTitle: string;
  targetUsernameLabel: string;
  targetUsernamePlaceholder: string;
  roleLabel: string;
  cancelButtonText: string;
  addAccessButtonText: string;
  addingAccessButtonText: string;
  noDocumentSelectedMessage: string;
  noOwnerSelectedMessage: string;
  targetUsernameRequiredMessage: string;
  addAccessFailedMessage: string;
  loadAccessFailedMessage: string;
  changeAccessRoleFailedMessage: string;
  removeAccessFailedMessage: string;
  transferOwnershipFailedMessage: string;
};

export type AddUserAccessCardProps = {
  targetUserName: string;
  selectedRole: AddDocumentAccessRole;
  isAddingAccess: boolean;
  isAddAccessDisabled: boolean;
  onSubmit: AddDocumentAccessFormSubmitHandler;
  onTargetUsernameChange: AddDocumentAccessInputChangeHandler;
  onRoleChange: AddDocumentAccessRoleChangeHandler;
};

export type TransferOwnershipCardProps = {
  accessUsers: AccessUser[];
  newOwnerUsername: string;
  isTransferOwnershipDisabled: boolean;
  isActionLoading: boolean;
  onNewOwnerUsernameChange: TransferOwnershipInputChangeHandler;
  onTransferOwnership: () => void;
};

export type TransferOwnershipConfirmModalProps = {
  isOpen: boolean;
  document: DocumentListItem | null;
  newOwnerUsername: string;
  isTransferringOwnership: boolean;
  onClose: () => void;
  onConfirmTransferOwnership: () => Promise<void>;
};

export type TransferOwnershipSuccessModalProps = {
  isOpen: boolean;
  message: string | null;
  onClose: () => void;
};

export type ChangeAccessCardProps = {
  accessUsers: AccessUser[];
  isLoadingAccess: boolean;
  isActionLoading: boolean;
  onRoleChange: (
    accessUser: AccessUser,
    newRole: AddDocumentAccessRole,
  ) => void;
  onRemoveAccess: (accessUser: AccessUser) => void;
};

export type AccessUserRowProps = {
  accessUser: AccessUser;
  isActionLoading: boolean;
  onRoleChange: (
    accessUser: AccessUser,
    newRole: AddDocumentAccessRole,
  ) => void;
  onRemoveAccess: (accessUser: AccessUser) => void;
};

export type RemoveAccessConfirmModalProps = {
  isOpen: boolean;
  accessUser: AccessUser | null;
  isRemovingAccess: boolean;
  onClose: () => void;
  onConfirmRemoveAccess: () => Promise<void>;
};
