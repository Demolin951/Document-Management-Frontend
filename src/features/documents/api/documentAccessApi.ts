import { getApiErrorMessage } from "../../../shared/api/apiErrorUtils";

import {
  documentAccessApiRoleByRole,
  documentAccessRoleByApiRole,
} from "../config/documentAccessConfig";
import type {
  AccessUser,
  AddDocumentAccessPayload,
  AddDocumentAccessRole,
  DocumentAccessApiResponse,
  DocumentAccessApiRole,
} from "../types/documentAccessTypes";
import type { DocumentRole } from "../../../shared/types/documentTypes";

function normalizeDocumentRole(
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

function normalizeDocumentAccessResponse(
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

export async function getDocumentAccessList(
  documentId: number,
  username: string,
): Promise<AccessUser[]> {
  const response = await fetch(
    `/api/document/${documentId}/access?username=${encodeURIComponent(
      username,
    )}`,
  );

  if (!response.ok) {
    const errorMessage = await getApiErrorMessage(
      response,
      "Access list could not be loaded.",
    );

    throw new Error(errorMessage);
  }

  const data = (await response.json()) as DocumentAccessApiResponse[];

  return data.map(normalizeDocumentAccessResponse);
}

export async function addDocumentAccess(
  payload: AddDocumentAccessPayload,
): Promise<AccessUser> {
  const response = await fetch(`/api/document/${payload.documentId}/access`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserName: payload.ownerUsername,
      TargetUserName: payload.targetUserName,
      Role: documentAccessApiRoleByRole[payload.role],
    }),
  });

  if (!response.ok) {
    const errorMessage = await getApiErrorMessage(
      response,
      "Access could not be added.",
    );

    throw new Error(errorMessage);
  }

  const data = (await response.json()) as DocumentAccessApiResponse;

  return normalizeDocumentAccessResponse(data);
}

export async function changeDocumentAccessRole(
  documentId: number,
  ownerUsername: string,
  targetUserName: string,
  role: AddDocumentAccessRole,
): Promise<AccessUser> {
  const response = await fetch(`/api/document/${documentId}/access`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserName: ownerUsername,
      TargetUserName: targetUserName,
      Role: documentAccessApiRoleByRole[role],
    }),
  });

  if (!response.ok) {
    const errorMessage = await getApiErrorMessage(
      response,
      "Access role could not be changed.",
    );

    throw new Error(errorMessage);
  }

  const data = (await response.json()) as DocumentAccessApiResponse;

  return normalizeDocumentAccessResponse(data);
}

export async function removeDocumentAccess(
  documentId: number,
  ownerUsername: string,
  targetUserName: string,
): Promise<void> {
  const response = await fetch(
    `/api/document/${documentId}/access?username=${encodeURIComponent(
      ownerUsername,
    )}&targetUserName=${encodeURIComponent(targetUserName)}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const errorMessage = await getApiErrorMessage(
      response,
      "Access could not be removed.",
    );

    throw new Error(errorMessage);
  }
}

export async function transferDocumentOwnership(
  documentId: number,
  currentOwnerUsername: string,
  newOwnerUsername: string,
): Promise<void> {
  const response = await fetch(`/api/document/${documentId}/owner`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      CurrentOwnerUserName: currentOwnerUsername,
      NewOwnerUserName: newOwnerUsername,
    }),
  });

  if (!response.ok) {
    const errorMessage = await getApiErrorMessage(
      response,
      "Ownership could not be transferred.",
    );

    throw new Error(errorMessage);
  }
}
