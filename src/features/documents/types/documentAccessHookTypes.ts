import type { DocumentListItem } from "../../../shared/types/documentTypes";

import type { AccessUser, AddDocumentAccessRole } from "./documentAccessApiTypes";

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
};

export type UseDocumentAccessManagementResult = {
  accessUsers: AccessUser[];
  isLoadingAccess: boolean;
  isAccessActionLoading: boolean;
  accessManagementErrorMessage: string | null;
  reloadAccessUsers: () => Promise<void>;
  changeAccessRole: (
    accessUser: AccessUser,
    newRole: AddDocumentAccessRole,
  ) => Promise<void>;
  removeAccess: (accessUser: AccessUser) => Promise<boolean>;
  transferOwnership: (newOwnerUsername: string) => Promise<boolean>;
};
