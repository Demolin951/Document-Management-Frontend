import { getApiErrorMessage } from "../../../shared/api/apiErrorUtils";
import { getDocumentAccessList } from "../../../shared/api/documentAccessApi";
import { normalizeDocumentAccessResponse } from "../../../shared/normalizers/documentAccessNormalizers";
import type { AccessUser, DocumentAccessApiResponse } from "../../../shared/types/documentAccessTypes";

import { documentAccessApiRoleByRole } from "../config/documentAccessRoleConfig";
import type { AddDocumentAccessPayload } from "../types/documentAccessApiTypes";
import type { AddDocumentAccessRole } from "../types/documentAccessTypes";

export { getDocumentAccessList };

export async function addDocumentAccess(payload: AddDocumentAccessPayload): Promise<AccessUser> {
  const response = await fetch(`/api/document/${payload.documentId}/access`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserName: payload.ownerUsername,
      TargetUserName: payload.targetUserName,
      Role: documentAccessApiRoleByRole[payload.role],
    }),
  });

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response, "Access could not be added."));
  }

  return normalizeDocumentAccessResponse((await response.json()) as DocumentAccessApiResponse);
}

export async function changeDocumentAccessRole(
  documentId: number,
  ownerUsername: string,
  targetUserName: string,
  role: AddDocumentAccessRole,
): Promise<AccessUser> {
  const response = await fetch(`/api/document/${documentId}/access`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserName: ownerUsername,
      TargetUserName: targetUserName,
      Role: documentAccessApiRoleByRole[role],
    }),
  });

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response, "Access role could not be changed."));
  }

  return normalizeDocumentAccessResponse((await response.json()) as DocumentAccessApiResponse);
}

export async function removeDocumentAccess(
  documentId: number,
  ownerUsername: string,
  targetUserName: string,
): Promise<void> {
  const response = await fetch(
    `/api/document/${documentId}/access?username=${encodeURIComponent(ownerUsername)}&targetUserName=${encodeURIComponent(targetUserName)}`,
    { method: "DELETE" },
  );

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response, "Access could not be removed."));
  }
}

export async function transferDocumentOwnership(
  documentId: number,
  currentOwnerUsername: string,
  newOwnerUsername: string,
): Promise<void> {
  const response = await fetch(`/api/document/${documentId}/owner`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      CurrentOwnerUserName: currentOwnerUsername,
      NewOwnerUserName: newOwnerUsername,
    }),
  });

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response, "Ownership could not be transferred."));
  }
}
