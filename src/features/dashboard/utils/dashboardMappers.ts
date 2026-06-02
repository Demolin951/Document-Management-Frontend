import { FileText, Share2, UserCheck, Users } from "lucide-react";

import type { DashboardStat } from "../types/dashboardTypes";
import type { DocumentListItem } from "../../documents/types/documentTypes";

export function buildDashboardStats(
  documents: DocumentListItem[],
  usersCount: number,
): DashboardStat[] {
  const sharedWithMeDocuments = documents.filter(
    (document) => document.role !== "Owner",
  );

  const otherOwnersCount = new Set(
    sharedWithMeDocuments.map((document) => document.owner),
  ).size;

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
      title: "Shared With Me",
      value: sharedWithMeDocuments.length,
      subtitle: "",
      icon: Share2,
    },
    {
      title: "Other Owners",
      value: otherOwnersCount,
      subtitle: "",
      icon: UserCheck,
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
