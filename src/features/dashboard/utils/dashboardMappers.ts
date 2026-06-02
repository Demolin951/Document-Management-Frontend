import { FileText, Share2, ShieldCheck, Users } from "lucide-react";

import type { DashboardStat } from "../types/dashboardTypes";
import type { DocumentListItem } from "../../documents/types/documentTypes";

export function buildDashboardStats(
  documents: DocumentListItem[],
  usersCount: number,
): DashboardStat[] {
  const ownedDocumentsCount = documents.filter(
    (document) => document.role === "Owner",
  ).length;

  const sharedDocumentsCount = documents.filter(
    (document) => document.role !== "Owner",
  ).length;

  return [
    {
      title: "Available Documents",
      value: documents.length,
      subtitle: "Documents available to selected user",
      icon: FileText,
    },
    {
      title: "Total Users",
      value: usersCount,
      subtitle: "Application users",
      icon: Users,
    },
    {
      title: "Owned Documents",
      value: ownedDocumentsCount,
      subtitle: "Documents owned by selected user",
      icon: ShieldCheck,
    },
    {
      title: "Shared Documents",
      value: sharedDocumentsCount,
      subtitle: "Editor and viewer access",
      icon: Share2,
    },
  ];
}

export function getRecentDocuments(
  documents: DocumentListItem[],
  limit = 5,
): DocumentListItem[] {
  return [...documents]
    .sort(
      (firstDocument, secondDocument) =>
        new Date(secondDocument.createdAtUtc).getTime() -
        new Date(firstDocument.createdAtUtc).getTime(),
    )
    .slice(0, limit);
}

export function getRoleCount(documents: DocumentListItem[], role: string) {
  return documents.filter((document) => document.role === role).length;
}
