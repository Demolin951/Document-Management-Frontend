import { documentAccessApiRoleByRole } from "../config/documentAccessConfig";
import type { AddDocumentAccessPayload } from "../types/documentAccessTypes";
 
export async function addDocumentAccess(
  payload: AddDocumentAccessPayload
): Promise<void> {
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
    throw new Error("Access could not be added.");
  }
}