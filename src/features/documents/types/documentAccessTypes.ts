import type { DocumentRole } from "../../../shared/types/documentTypes";

export type AddDocumentAccessRole = Exclude<DocumentRole, "Owner">;

export type DocumentAccessRoleOption = {
  value: AddDocumentAccessRole;
  label: string;
};
