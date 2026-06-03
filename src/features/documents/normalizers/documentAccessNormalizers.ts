import type { DocumentRole } from "../../../shared/types/documentTypes";

import { documentAccessRoleByApiRole } from "../config/documentAccessRoleConfig";
import type {
  AccessUser,
  DocumentAccessApiResponse,
  DocumentAccessApiRole,
} from "../types/documentAccessApiTypes";

export function normalizeDocumentRole(
  role: DocumentAccessApiRole | DocumentRole | undefined,
): DocumentRole {
  if (role === undefined) {
    throw new Error("Document access role is missing.");
  }

  if (typeof role === "number") {
    return documentAccessRoleByApiRole[role];
  }

  return role;
}

export function normalizeDocumentAccessResponse(
  response: DocumentAccessApiResponse,
): AccessUser {
  const userId = response.userId ?? response.UserId;
  const userName = response.userName ?? response.UserName;
  const role = response.role ?? response.Role;

  if (typeof userId !== "number") {
    throw new Error("Document access user id is missing.");
  }

  if (!userName) {
    throw new Error("Document access username is missing.");
  }

  return {
    id: userId,
    name: userName,
    username: userName,
    role: normalizeDocumentRole(role),
  };
}
