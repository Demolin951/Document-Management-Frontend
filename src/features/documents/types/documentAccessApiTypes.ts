import type { AddDocumentAccessRole } from "./documentAccessTypes";

export type AddDocumentAccessPayload = {
  documentId: number;
  ownerUsername: string;
  targetUserName: string;
  role: AddDocumentAccessRole;
};
