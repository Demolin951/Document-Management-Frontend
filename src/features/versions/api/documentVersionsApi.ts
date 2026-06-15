import { getApiErrorMessage } from "../../../shared/api/apiErrorUtils";
import { getFileNameFromContentDisposition } from "../../../shared/utils/fileDownloadUtils";

import { normalizeDocumentVersion } from "../normalizers/documentVersionNormalizers";
import type { VersionDownloadResult } from "../types/documentVersionDownloadTypes";
import type {
  DocumentVersionApiResponse,
  DocumentVersionListItem,
} from "../types/documentVersionTypes";

export async function getDocumentVersions(
  documentId: number,
  username: string,
): Promise<DocumentVersionListItem[]> {
  const query = new URLSearchParams({
    username,
  });

  const response = await fetch(
    `/api/document/${documentId}/version/all?${query.toString()}`,
  );

  if (!response.ok) {
    const errorMessage = await getApiErrorMessage(
      response,
      "Versions could not be loaded.",
    );

    throw new Error(errorMessage);
  }

  const data = (await response.json()) as DocumentVersionApiResponse[];

  return data.map(normalizeDocumentVersion);
}

export async function downloadLatestDocumentVersion(
  documentId: number,
  username: string,
  fallbackFileName: string,
): Promise<VersionDownloadResult> {
  const query = new URLSearchParams({
    username,
  });

  const response = await fetch(
    `/api/document/${documentId}/version/download/latest?${query.toString()}`,
  );

  if (!response.ok) {
    const errorMessage = await getApiErrorMessage(
      response,
      "Latest version could not be downloaded.",
    );

    throw new Error(errorMessage);
  }

  return {
    blob: await response.blob(),
    fileName:
      getFileNameFromContentDisposition(
        response.headers.get("content-disposition"),
      ) ?? fallbackFileName,
  };
}

export async function downloadDocumentVersion(
  documentId: number,
  versionNumber: number,
  username: string,
  fallbackFileName: string,
): Promise<VersionDownloadResult> {
  const query = new URLSearchParams({
    username,
  });

  const response = await fetch(
    `/api/document/${documentId}/version/${versionNumber}/download?${query.toString()}`,
  );

  if (!response.ok) {
    const errorMessage = await getApiErrorMessage(
      response,
      "Version could not be downloaded.",
    );

    throw new Error(errorMessage);
  }

  return {
    blob: await response.blob(),
    fileName:
      getFileNameFromContentDisposition(
        response.headers.get("content-disposition"),
      ) ?? fallbackFileName,
  };
}
