import type { DocumentAccessApiRole } from "../../../shared/types/documentAccessTypes";
import type {
  AddDocumentAccessRole,
  DocumentAccessRoleOption,
} from "../types/documentAccessTypes";

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
