import type {
  DocumentVersionApiResponse,
  DocumentVersionListItem,
} from "../types/documentVersionTypes";

export function normalizeDocumentVersion(
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
