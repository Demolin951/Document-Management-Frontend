import { FileText, Share2, Crown, Users } from "lucide-react";

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
      subtitle: "",
      icon: FileText,
    },
    {
      title: "Total Users",
      value: usersCount,
      subtitle: "",
      icon: Users,
    },
    {
      title: "Owned Documents",
      value: ownedDocumentsCount,
      subtitle: "",
      icon: Crown,
    },
    {
      title: "Shared Documents",
      value: sharedDocumentsCount,
      subtitle: "",
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
