import type { DocumentRole, } from "../types/documentTypes";

type DocumentRoleConfig = {
    label: string;
    badgeClassName: string;
};

export const documentRoleConfig: Record<DocumentRole, DocumentRoleConfig> = {
    Owner: {
        label:"Owner",
        badgeClassName: "bg-blue-50 text-blue-700 ring-blue-100",
    },

    Editor: {
        label: "Editor",
        badgeClassName: "bg-amber-50 text-amber-700 ring-amber-100",
    },

    Viewer: {
        label: "Viewer",
        badgeClassName: "bg-slate-100 text-slate-700 ring-slate-200",
    },
};