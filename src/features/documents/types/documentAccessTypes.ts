import type { FormEvent } from "react";

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
  targetUserName: string;
  selectedRole: AddDocumentAccessRole;
  isAddingAccess: boolean;
  addAccessErrorMessage: string | null;
  onTargetUserNameChange: (value: string) => void;
  onRoleChange: (role: AddDocumentAccessRole) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
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
