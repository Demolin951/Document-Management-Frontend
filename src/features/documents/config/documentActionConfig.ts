import { Download, Eye, FileUp, Users, type LucideIcon } from "lucide-react";
import type { DocumentRole } from "../types/documentTypes";
 
export type DocumentActionKey =
  | "view"
  | "download"
  | "createNewVersion"
  | "manageAccess";
 
export type DocumentActionConfig = {
  key: DocumentActionKey;
  title: string;
  icon: LucideIcon;
  allowedRoles: DocumentRole[];
};
 
export const documentActionConfig: DocumentActionConfig[] = [
  {
    key: "view",
    title: "View document",
    icon: Eye,
    allowedRoles: ["Owner", "Editor", "Viewer"],
  },
  {
    key: "download",
    title: "Download document",
    icon: Download,
    allowedRoles: ["Owner", "Editor", "Viewer"],
  },
  {
    key: "createNewVersion",
    title: "Upload new version",
    icon: FileUp,
    allowedRoles: ["Owner", "Editor"],
  },
  {
    key: "manageAccess",
    title: "Manage access",
    icon: Users,
    allowedRoles: ["Owner"],
  },
];