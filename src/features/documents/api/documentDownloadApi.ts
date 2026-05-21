export async function downloadLatestDocumentVersion(
  documentId: number,
  username: string
): Promise<Blob> {
  const query = new URLSearchParams({
    username,
  });
 
  const response = await fetch(
    `/api/document/${documentId}/version/download/latest?${query.toString()}`
  );
 
  if (!response.ok) {
    throw new Error("Document could not be downloaded.");
  }
 
  return response.blob();
}