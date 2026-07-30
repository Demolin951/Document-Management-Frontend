import { useEffect, useState } from "react";

import { getDocumentAccessList } from "../../../shared/api/documentAccessApi";
import { getDocumentsByUsername } from "../../../shared/api/documentsApi";
import { getUsers } from "../../../shared/api/usersApi";
import type { DocumentListItem } from "../../../shared/types/documentTypes";
import { getReadableErrorMessage } from "../../../shared/utils/errorUtils";

export type UseDashboardDataResult = {
  documents: DocumentListItem[];
  usersCount: number;
  sharedToOthersCount: number;
  isLoadingDashboard: boolean;
  dashboardErrorMessage: string | null;
};

async function getSharedToOthersCount(
  documents: DocumentListItem[],
  username: string,
): Promise<number> {
  const ownedDocuments = documents.filter(
    (document) => document.role === "Owner",
  );

  const sharedStates = await Promise.all(
    ownedDocuments.map(async (document) => {
      const accessList = await getDocumentAccessList(document.id, username);

      return accessList.some(
        (accessUser) => accessUser.name.toLowerCase() !== username.toLowerCase(),
      );
    }),
  );

  return sharedStates.filter(Boolean).length;
}

export function useDashboardData(
  username: string | undefined,
): UseDashboardDataResult {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [sharedToOthersCount, setSharedToOthersCount] = useState(0);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [dashboardErrorMessage, setDashboardErrorMessage] = useState<
    string | null
  >(null);

  useEffect(() => {
    let isCurrentRequest = true;

    async function loadDashboardData() {
      if (!username) {
        if (!isCurrentRequest) {
          return;
        }

        setDocuments([]);
        setUsersCount(0);
        setSharedToOthersCount(0);
        setDashboardErrorMessage(null);
        setIsLoadingDashboard(false);
        return;
      }

      setIsLoadingDashboard(true);
      setDashboardErrorMessage(null);

      try {
        const [loadedDocuments, loadedUsers] = await Promise.all([
          getDocumentsByUsername(username),
          getUsers(),
        ]);

        const loadedSharedToOthersCount = await getSharedToOthersCount(
          loadedDocuments,
          username,
        );

        if (!isCurrentRequest) {
          return;
        }

        setDocuments(loadedDocuments);
        setUsersCount(loadedUsers.length);
        setSharedToOthersCount(loadedSharedToOthersCount);
      } catch (error) {
        if (!isCurrentRequest) {
          return;
        }

        setDashboardErrorMessage(
          getReadableErrorMessage(error, "Dashboard data could not be loaded."),
        );
        setDocuments([]);
        setUsersCount(0);
        setSharedToOthersCount(0);
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
    sharedToOthersCount,
    isLoadingDashboard,
    dashboardErrorMessage,
  };
}
