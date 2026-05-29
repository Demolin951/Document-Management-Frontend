import type { DataTableColumn } from "../../../components/ui/types/dataTableTypes";
import type {
  DocumentVersionListItem,
  VersionDocumentRow,
} from "../types/documentVersionTypes";
 
export const availableDocumentsVersionTableColumns: DataTableColumn[] = [
  {
    key: "document",
    label: "Document",
    width: "minmax(0, 1fr)",
  },
  {
    key: "actions",
    label: "Actions",
    width: "140px",
    className: "text-right",
  },
];
 
export const versionHistoryTableColumns: DataTableColumn[] = [
  {
    key: "version",
    label: "Version",
    width: "120px",
  },
  {
    key: "uploadedBy",
    label: "Uploaded by",
    width: "minmax(0, 1fr)",
  },
  {
    key: "uploadedAt",
    label: "Uploaded at",
    width: "220px",
  },
  {
    key: "actions",
    label: "Actions",
    width: "120px",
    className: "text-right",
  },
];
 
export const mockVersionDocuments: VersionDocumentRow[] = [
  {
    id: 1,
    fileName: "Contract_2026.pdf",
    owner: "max",
    createdAtUtc: "2026-05-25T09:20:00Z",
    role: "Owner",
  },
  {
    id: 2,
    fileName: "Report_Q2.pdf",
    owner: "anna",
    createdAtUtc: "2026-05-27T11:30:00Z",
    role: "Viewer",
  },
  {
    id: 3,
    fileName: "Budget_2026.pdf",
    owner: "max",
    createdAtUtc: "2026-05-28T16:12:00Z",
    role: "Editor",
  },
];
 
export const mockDocumentVersionsByDocumentId: Record<
  number,
  DocumentVersionListItem[]
> = {
  1: [
    {
      id: 4,
      documentId: 1,
      versionNumber: 4,
      uploadedBy: "anna",
      uploadedAtUtc: "2026-05-29T10:42:00Z",
    },
    {
      id: 3,
      documentId: 1,
      versionNumber: 3,
      uploadedBy: "max",
      uploadedAtUtc: "2026-05-28T16:12:00Z",
    },
    {
      id: 2,
      documentId: 1,
      versionNumber: 2,
      uploadedBy: "bob",
      uploadedAtUtc: "2026-05-27T11:30:00Z",
    },
    {
      id: 1,
      documentId: 1,
      versionNumber: 1,
      uploadedBy: "max",
      uploadedAtUtc: "2026-05-25T09:20:00Z",
    },
  ],
  2: [
    {
      id: 6,
      documentId: 2,
      versionNumber: 2,
      uploadedBy: "anna",
      uploadedAtUtc: "2026-05-28T14:05:00Z",
    },
    {
      id: 5,
      documentId: 2,
      versionNumber: 1,
      uploadedBy: "anna",
      uploadedAtUtc: "2026-05-27T11:30:00Z",
    },
  ],
  3: [
    {
      id: 9,
      documentId: 3,
      versionNumber: 3,
      uploadedBy: "max",
      uploadedAtUtc: "2026-05-29T08:15:00Z",
    },
    {
      id: 8,
      documentId: 3,
      versionNumber: 2,
      uploadedBy: "bob",
      uploadedAtUtc: "2026-05-28T18:20:00Z",
    },
    {
      id: 7,
      documentId: 3,
      versionNumber: 1,
      uploadedBy: "max",
      uploadedAtUtc: "2026-05-28T16:12:00Z",
    },
  ],
};