import type { DocumentAccessConfig } from "../types/documentAccessComponentTypes";

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
