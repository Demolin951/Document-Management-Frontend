import type { DocumentListItem } from "../../../shared/types/documentTypes";
import type { AddDocumentAccessRole } from "./documentAccessTypes";

export type AddDocumentAccessPayload = {
  documentId: number;
  ownerUsername: string;
  targetUserName: string;
  role: AddDocumentAccessRole;
};

export type ManageDocumentAccessPayload = {
  document: DocumentListItem;
  ownerUsername: string;
};
