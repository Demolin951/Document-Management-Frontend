import { useEffect, useState } from "react";

import { getDocumentsByUsername } from "../../documents/api/documentsApi";
import type { DocumentListItem } from "../../documents/types/documentTypes";
import { getManagedUsers } from "../../users/api/usersManagementApi";

export type UseDashboardDataResult = {
  documents: DocumentListItem[];
  usersCount: number;
  isLoadingDashboard: boolean;
  dashboardErrorMessage: string | null;
};

function getReadableErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export function useDashboardData(
  username: string | undefined,
): UseDashboardDataResult {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [dashboardErrorMessage, setDashboardErrorMessage] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!username) {
      setDocuments([]);
      setUsersCount(0);
      setDashboardErrorMessage(null);
      return;
    }

    let isCurrentRequest = true;

    async function loadDashboardData() {
      setIsLoadingDashboard(true);
      setDashboardErrorMessage(null);

      try {
        const [loadedDocuments, loadedUsers] = await Promise.all([
          getDocumentsByUsername(username),
          getManagedUsers(),
        ]);

        if (!isCurrentRequest) {
          return;
        }

        setDocuments(loadedDocuments);
        setUsersCount(loadedUsers.length);
      } catch (error) {
        if (!isCurrentRequest) {
          return;
        }

        setDashboardErrorMessage(
          getReadableErrorMessage(error, "Dashboard data could not be loaded."),
        );
        setDocuments([]);
        setUsersCount(0);
      } finally {
        if (isCurrentRequest) {
          setIsLoadingDashboard(false);
        }
      }
    }

    void loadDashboardData();

    return () => {
      isCurrentRequest = false;
    };
  }, [username]);

  return {
    documents,
    usersCount,
    isLoadingDashboard,
    dashboardErrorMessage,
  };
}
