export type DocumentRole = "Owner" | "Editor" | "Viewer";

export type AppUser = {
    id: string;
    name: string;
};

export type DocumentListItem = {
    id: number;
    fileName: string;
    createdAtUtc: string;
    role: DocumentRole;
};