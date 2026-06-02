import type { LucideIcon } from "lucide-react";
import type { DocumentRole } from "../../../shared/types/documentTypes";

export type DocumentActionKey =
  | "view"
  | "download"
  | "uploadNewVersion"
  | "manageAccess"
  | "deleteDocument";

export type DocumentActionConfig = {
  key: DocumentActionKey;
  title: string;
  icon: LucideIcon;
  allowedRoles: DocumentRole[];
};
