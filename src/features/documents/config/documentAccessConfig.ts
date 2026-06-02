import type {
  AddDocumentAccessRole,
  DocumentAccessApiRole,
  DocumentAccessConfig,
  DocumentAccessRoleOption,
} from "../types/documentAccessTypes";
import type { DocumentRole } from "../types/documentTypes";
  
export const documentAccessRoleOptions: DocumentAccessRoleOption[] = [
  {
    value: "Viewer",
    label: "Viewer",
  },
  {
    value: "Editor",
    label: "Editor",
  },
];
  
export const documentAccessApiRoleByRole: Record<
  AddDocumentAccessRole,
  DocumentAccessApiRole
> = {
  Editor: 1,
  Viewer: 2,
};
  
export const documentAccessRoleByApiRole: Record<
  DocumentAccessApiRole,
  DocumentRole
> = {
  0: "Owner",
  1: "Editor",
  2: "Viewer",
};
  
export const documentAccessConfig: DocumentAccessConfig = {
  modalTitle: "Change Permissions",
  targetUsernameLabel: "Username",
  targetUsernamePlaceholder: "Enter username",
  roleLabel: "Role",
  cancelButtonText: "Cancel",
  addAccessButtonText: "Add access",
  addingAccessButtonText: "Adding...",
  noDocumentSelectedMessage: "No document selected.",
  noOwnerSelectedMessage: "Please select the owner user before adding access.",
  targetUsernameRequiredMessage: "Please enter a username.",
  addAccessFailedMessage: "Access could not be added.",
  loadAccessFailedMessage: "Access list could not be loaded.",
  changeAccessRoleFailedMessage: "Access role could not be changed.",
  removeAccessFailedMessage: "Access could not be removed.",
  transferOwnershipFailedMessage: "Ownership could not be transferred.",
};
  
export const documentAccessModalPanelClassName = "w-[92vw] max-w-5xl";
  
export const transferOwnershipConfig = {
  title: "Transfer Ownership",
  newOwnerLabel: "New owner",
  newOwnerPlaceholder: "Enter username",
  transferButtonText: "Transfer ownership",
};
  
export const changeAccessConfig = {
  title: "Change Access",
  userColumn: "User",
  usernameColumn: "Username",
  roleColumn: "Role",
  actionsColumn: "Actions",
  lockedText: "Locked",
  removeButtonText: "Remove",
  loadingText: "Loading access list...",
  emptyText: "No users found.",
  ownerInfoText:
    "The ownership can only be transfered to user that already has access",
};

export const transferOwnershipConfirmConfig = {
  title: "Transfer ownership",
  questionText: "Are you sure you want to transfer ownership of this document?",
  warningText: "The current owner will lose ownership and become an editor.",
  cancelButtonText: "Cancel",
  confirmButtonText: "Transfer ownership",
  transferringButtonText: "Transferring...",
};

export const transferOwnershipSuccessConfig = {
  title: "Ownership transferred",
  closeButtonText: "OK",
};
