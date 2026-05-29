export async function deleteDocument(
  documentId: number,
  username: string,
): Promise<void> {
  const query = new URLSearchParams({
    username,
  });

  const response = await fetch(`/api/document/${documentId}?${query.toString()}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Document could not be deleted.");
  }
}
