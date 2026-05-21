import type {
  AddDocumentAccessRole,
  DocumentAccessApiRole,
  DocumentAccessConfig,
  DocumentAccessRoleOption,
} from "../types/documentAccessTypes";
 
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
 
export const documentAccessConfig: DocumentAccessConfig = {
  modalTitle: "Add Access",
  targetUsernameLabel: "Target Username",
  targetUsernamePlaceholder: "Enter username...",
  roleLabel: "Role",
  cancelButtonText: "Cancel",
  addAccessButtonText: "Add Access",
  addingAccessButtonText: "Adding...",
  noDocumentSelectedMessage: "No document selected.",
  noOwnerSelectedMessage: "Please select the owner user before adding access.",
  targetUsernameRequiredMessage: "Please enter a target username.",
  addAccessFailedMessage: "Access could not be added.",
};