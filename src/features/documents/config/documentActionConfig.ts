import { Download, FileUp, Trash2, Users } from "lucide-react";
import type { DocumentActionConfig } from "../types/documentActionTypes";

export const documentActionConfig: DocumentActionConfig[] = [
  {
    key: "download",
    title: "Download document",
    icon: Download,
    allowedRoles: ["Owner", "Editor", "Viewer"],
  },
  {
    key: "uploadNewVersion",
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
  {
    key: "deleteDocument",
    title: "Delete document",
    icon: Trash2,
    allowedRoles: ["Owner"],
  },
];
