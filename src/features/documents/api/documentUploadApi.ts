import type { UploadDocumentPayload } from "../types/documentUploadTypes";
 
const DOCUMENT_UPLOAD_API_URL = "/api/document";
 
export async function uploadDocument(
  payload: UploadDocumentPayload
): Promise<void> {
  const formData = new FormData();
 
  formData.append("File", payload.file);
  formData.append("UserName", payload.username);
 
  const response = await fetch(DOCUMENT_UPLOAD_API_URL, {
    method: "POST",
    body: formData,
  });
 
  if (!response.ok) {
    throw new Error("Document could not be uploaded.");
  }
}