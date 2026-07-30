import { getApiErrorMessage } from "./apiErrorUtils";
import { normalizeDocumentAccessResponse } from "../normalizers/documentAccessNormalizers";
import type {
  AccessUser,
  DocumentAccessApiResponse,
} from "../types/documentAccessTypes";

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
