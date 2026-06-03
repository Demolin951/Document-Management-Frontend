import type { DocumentListItem, DocumentRole } from "../../../shared/types/documentTypes";

export type AddDocumentAccessRole = Exclude<DocumentRole, "Owner">;

export type DocumentAccessApiRole = 0 | 1 | 2;

export type AddDocumentAccessPayload = {
  documentId: number;
  ownerUsername: string;
  targetUserName: string;
  role: AddDocumentAccessRole;
};

export type DocumentAccessApiResponse = {
  documentId?: number;
  DocumentId?: number;
  userId?: number;
  UserId?: number;
  userName?: string;
  UserName?: string;
  role?: DocumentAccessApiRole | DocumentRole;
  Role?: DocumentAccessApiRole | DocumentRole;
};

export type AccessUser = {
  id: number;
  name: string;
  username: string;
  role: DocumentRole;
};

export type DocumentAccessRoleOption = {
  value: AddDocumentAccessRole;
  label: string;
};

export type ManageDocumentAccessPayload = {
  document: DocumentListItem;
  ownerUsername: string;
};
