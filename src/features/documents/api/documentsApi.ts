import type { DocumentListItem } from "../types/documentTypes";

export async function getDocumentsByUsername(
    username:string
): Promise<DocumentListItem[]>{
    const query = new URLSearchParams({
        username,
    });

    const response = await fetch(`/api/document?${query.toString()}`);

    if(!response.ok){
        throw new Error("Documents could not be loaded");
    }

    return response.json();
}