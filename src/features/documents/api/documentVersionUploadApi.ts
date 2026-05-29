export type UploadDocumentVersionPayload = {
  documentId: number;
  file: File;
  username: string;
};

export async function uploadDocumentVersion(
  payload: UploadDocumentVersionPayload,
): Promise<void> {
  const formData = new FormData();

  formData.append("File", payload.file);
  formData.append("UserName", payload.username);

  const response = await fetch(`/api/document/${payload.documentId}/version`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Document version could not be uploaded.");
  }
}
