import type { DocumentRole } from "../../../shared/types/documentTypes";
import type {
  AddDocumentAccessRole,
  DocumentAccessApiRole,
  DocumentAccessRoleOption,
} from "../types/documentAccessApiTypes";

export const documentAccessRoleOptions: DocumentAccessRoleOption[] = [
  {
    value: "Viewer",
    label: "Viewer",
  },
  {
    value: "Editor",
    label: "Editor",
  },
];

export const documentAccessApiRoleByRole: Record<
  AddDocumentAccessRole,
  DocumentAccessApiRole
> = {
  Editor: 1,
  Viewer: 2,
};

export const documentAccessRoleByApiRole: Record<
  DocumentAccessApiRole,
  DocumentRole
> = {
  0: "Owner",
  1: "Editor",
  2: "Viewer",
};
