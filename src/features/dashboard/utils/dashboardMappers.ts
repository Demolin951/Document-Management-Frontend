import { FileText, Share2, Spline, Users } from "lucide-react";

import type { DashboardStat } from "../types/dashboardTypes";
import type { DocumentListItem } from "../../documents/types/documentTypes";

export function buildDashboardStats(
  documents: DocumentListItem[],
  usersCount: number,
  sharedToOthersCount: number,
): DashboardStat[] {
  const sharedWithMeCount = documents.filter(
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
      title: "Shared With Me",
      value: sharedWithMeCount,
      subtitle: "",
      icon: Spline,
    },
    {
      title: "Shared To Others",
      value: sharedToOthersCount,
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
