import type {
  AccessUser,
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
  ownerInfoText:
    "The owner has full control over this document, including changing permissions and transferring ownership. Ownership can only be transferred to another user.",
};
 
export const documentAccessMockSharedUsers: AccessUser[] = [
  {
    id: 2,
    name: "Anna Schmidt",
    username: "anna.schmidt",
    role: "Viewer",
  },
  {
    id: 3,
    name: "Max Weber",
    username: "max.weber",
    role: "Editor",
  },
  {
    id: 4,
    name: "Lisa Müller",
    username: "lisa.mueller",
    role: "Viewer",
  },
];