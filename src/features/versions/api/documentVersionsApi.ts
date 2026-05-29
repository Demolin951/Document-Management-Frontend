import type {
  DocumentVersionApiResponse,
  DocumentVersionListItem,
} from "../types/documentVersionTypes";

function getVersionApiErrorMessage(
  response: Response,
  fallbackMessage: string,
): Promise<string> {
  return response
    .json()
    .then((body: { title?: string; detail?: string }) => {
      return body.detail ?? body.title ?? fallbackMessage;
    })
    .catch(() => fallbackMessage);
}

function normalizeDocumentVersion(
  response: DocumentVersionApiResponse,
): DocumentVersionListItem {
  const id = response.id ?? response.Id;
  const documentId = response.documentId ?? response.DocumentId;
  const versionNumber = response.versionNumber ?? response.VersionNumber;
  const uploadedBy = response.uploadedBy ?? response.UploadedBy;
  const uploadedAtUtc = response.uploadedAtUtc ?? response.UploadedAtUtc;

  if (typeof id !== "number") {
    throw new Error("Version id is missing.");
  }

  if (typeof documentId !== "number") {
    throw new Error("Document id is missing.");
  }

  if (typeof versionNumber !== "number") {
    throw new Error("Version number is missing.");
  }

  if (!uploadedBy) {
    throw new Error("Uploaded by is missing.");
  }

  if (!uploadedAtUtc) {
    throw new Error("Uploaded date is missing.");
  }

  return {
    id,
    documentId,
    versionNumber,
    uploadedBy,
    uploadedAtUtc,
  };
}

function getFileNameFromContentDisposition(
  contentDisposition: string | null,
): string | null {
  if (!contentDisposition) {
    return null;
  }

  const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);

  return fileNameMatch?.[1] ?? null;
}

async function downloadBlobAsFile(response: Response, fallbackFileName: string) {
  const blob = await response.blob();
  const fileName =
    getFileNameFromContentDisposition(
      response.headers.get("content-disposition"),
    ) ?? fallbackFileName;

  const url = window.URL.createObjectURL(blob);
  const anchorElement = document.createElement("a");

  anchorElement.href = url;
  anchorElement.download = fileName;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();

  window.URL.revokeObjectURL(url);
}

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
    const errorMessage = await getVersionApiErrorMessage(
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
): Promise<void> {
  const query = new URLSearchParams({
    username,
  });

  const response = await fetch(
    `/api/document/${documentId}/version/download/latest?${query.toString()}`,
  );

  if (!response.ok) {
    const errorMessage = await getVersionApiErrorMessage(
      response,
      "Latest version could not be downloaded.",
    );

    throw new Error(errorMessage);
  }

  await downloadBlobAsFile(response, fallbackFileName);
}

export async function downloadDocumentVersion(
  documentId: number,
  versionNumber: number,
  username: string,
  fallbackFileName: string,
): Promise<void> {
  const query = new URLSearchParams({
    username,
  });

  const response = await fetch(
    `/api/document/${documentId}/version/${versionNumber}/download?${query.toString()}`,
  );

  if (!response.ok) {
    const errorMessage = await getVersionApiErrorMessage(
      response,
      "Version could not be downloaded.",
    );

    throw new Error(errorMessage);
  }

  await downloadBlobAsFile(response, fallbackFileName);
}
