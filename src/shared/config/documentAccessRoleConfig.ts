import type { DocumentRole } from "../types/documentTypes";
import type { DocumentAccessApiRole } from "../types/documentAccessTypes";

export const documentAccessRoleByApiRole: Record<
  DocumentAccessApiRole,
  DocumentRole
> = {
  0: "Owner",
  1: "Editor",
  2: "Viewer",
};
