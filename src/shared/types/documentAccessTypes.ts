import type { DocumentRole } from "./documentTypes";

export type DocumentAccessApiRole = 0 | 1 | 2;

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
