import type { ChangeEvent, FormEvent } from "react";
 
import type { DocumentListItem, DocumentRole } from "./documentTypes";
 
export type AddDocumentAccessRole = Exclude<DocumentRole, "Owner">;
 
export type DocumentAccessApiRole = 1 | 2;
 
export type AddDocumentAccessPayload = {
  documentId: number;
  ownerUsername: string;
  targetUserName: string;
  role: AddDocumentAccessRole;
};
 
export type ManageDocumentAccessModalProps = {
  isOpen: boolean;
  document: DocumentListItem | null;
  ownerUsername: string | undefined;
  onClose: () => void;
};
 
export type DocumentAccessRoleOption = {
  value: AddDocumentAccessRole;
  label: string;
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
};
 
export type AccessUser = {
  id: number;
  name: string;
  username: string;
  role: DocumentRole;
};
 
export type UseAddDocumentAccessResult = {
  targetUserName: string;
  selectedRole: AddDocumentAccessRole;
  isAddingAccess: boolean;
  addAccessErrorMessage: string | null;
  setTargetUserName: (targetUserName: string) => void;
  setSelectedRole: (role: AddDocumentAccessRole) => void;
  resetAddAccessState: () => void;
  submitAddAccess: (
    document: DocumentListItem | null,
    ownerUsername: string | undefined,
  ) => Promise<boolean>;
};
 
export type UseTransferOwnershipFormResult = {
  newOwnerUsername: string;
  isTransferOwnershipDisabled: boolean;
  setNewOwnerUsername: (newOwnerUsername: string) => void;
  resetTransferOwnershipState: () => void;
  submitTransferOwnership: (document: DocumentListItem | null) => void;
};
 
export type UseDocumentAccessPreviewResult = {
  accessUsers: AccessUser[];
  handleAccessRoleChange: (
    accessUser: AccessUser,
    newRole: AddDocumentAccessRole,
  ) => void;
  handleRemoveAccess: (accessUser: AccessUser) => void;
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
  newOwnerUsername: string;
  isTransferOwnershipDisabled: boolean;
  onNewOwnerUsernameChange: TransferOwnershipInputChangeHandler;
  onTransferOwnership: () => void;
};
 
export type ChangeAccessCardProps = {
  accessUsers: AccessUser[];
  onRoleChange: (
    accessUser: AccessUser,
    newRole: AddDocumentAccessRole,
  ) => void;
  onRemoveAccess: (accessUser: AccessUser) => void;
};
 
export type AccessUserRowProps = {
  accessUser: AccessUser;
  onRoleChange: (
    accessUser: AccessUser,
    newRole: AddDocumentAccessRole,
  ) => void;
  onRemoveAccess: (accessUser: AccessUser) => void;
};
 
export type AddDocumentAccessFormSubmitEvent = FormEvent<HTMLFormElement>;
 
export type AddDocumentAccessInputChangeEvent = ChangeEvent<HTMLInputElement>;
 
export type AddDocumentAccessRoleChangeEvent = ChangeEvent<HTMLSelectElement>;
 
export type TransferOwnershipInputChangeEvent =
  ChangeEvent<HTMLInputElement>;
 
export type AddDocumentAccessFormSubmitHandler = (
  event: AddDocumentAccessFormSubmitEvent,
) => void;
 
export type AddDocumentAccessInputChangeHandler = (
  event: AddDocumentAccessInputChangeEvent,
) => void;
 
export type AddDocumentAccessRoleChangeHandler = (
  event: AddDocumentAccessRoleChangeEvent,
) => void;
 
export type TransferOwnershipInputChangeHandler = (
  event: TransferOwnershipInputChangeEvent,
) => void;