export type DocumentRole = "Owner" | "Editor" | "Viewer";

export type DocumentListItem = {
    id: number;
    fileName: string;
    owner: string;
    createdAtUtc: string;
    role: DocumentRole;
};