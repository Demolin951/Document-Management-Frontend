export type DocumentRole = "Owner" | "Editor" | "Viewer";

export type AppUser = {
    id: number;
    name: string;
};

export type DocumentListItem = {
    id: number;
    fileName: string;
    createdAtUtc: string;
    role: DocumentRole;
};