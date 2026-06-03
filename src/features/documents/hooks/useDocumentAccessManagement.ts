import { useCallback, useEffect, useState } from "react";

import { getDocumentAccessList } from "../../../shared/api/documentAccessApi";
import type { AccessUser } from "../../../shared/types/documentAccessTypes";
import type { DocumentListItem } from "../../../shared/types/documentTypes";

import {
  changeDocumentAccessRole,
  removeDocumentAccess,
  transferDocumentOwnership,
} from "../api/documentAccessApi";
import { documentAccessConfig } from "../config/documentAccessModalConfig";
import type { AddDocumentAccessRole } from "../types/documentAccessTypes";
import type { UseDocumentAccessManagementResult } from "../types/documentAccessHookTypes";

export function useDocumentAccessManagement(
  document: DocumentListItem | null,
  ownerUsername: string | undefined,
  isOpen: boolean,
): UseDocumentAccessManagementResult {
  const [accessUsers, setAccessUsers] = useState<AccessUser[]>([]);
  const [isLoadingAccess, setIsLoadingAccess] = useState(false);
  const [isAccessActionLoading, setIsAccessActionLoading] = useState(false);
  const [accessManagementErrorMessage, setAccessManagementErrorMessage] =
    useState<string | null>(null);

  const loadAccessUsers = useCallback(async () => {
    if (!isOpen) {
      setAccessUsers([]);
      setAccessManagementErrorMessage(null);
      return;
    }

    if (!document || !ownerUsername) {
      setAccessUsers([]);
      return;
    }

    setIsLoadingAccess(true);
    setAccessManagementErrorMessage(null);

    try {
      const loadedAccessUsers = await getDocumentAccessList(
        document.id,
        ownerUsername,
      );

      setAccessUsers(loadedAccessUsers);
    } catch {
      setAccessManagementErrorMessage(
        documentAccessConfig.loadAccessFailedMessage,
      );
    } finally {
      setIsLoadingAccess(false);
    }
  }, [document, ownerUsername, isOpen]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAccessUsers();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadAccessUsers]);

  async function changeAccessRole(
    accessUser: AccessUser,
    newRole: AddDocumentAccessRole,
  ) {
    if (!document || !ownerUsername || accessUser.role === newRole) {
      return;
    }

    setIsAccessActionLoading(true);
    setAccessManagementErrorMessage(null);

    try {
      await changeDocumentAccessRole(
        document.id,
        ownerUsername,
        accessUser.username,
        newRole,
      );

      await loadAccessUsers();
    } catch {
      setAccessManagementErrorMessage(
        documentAccessConfig.changeAccessRoleFailedMessage,
      );
    } finally {
      setIsAccessActionLoading(false);
    }
  }

  async function removeAccess(accessUser: AccessUser): Promise<boolean> {
    if (!document || !ownerUsername) {
      return false;
    }

    setIsAccessActionLoading(true);
    setAccessManagementErrorMessage(null);

    try {
      await removeDocumentAccess(document.id, ownerUsername, accessUser.username);

      await loadAccessUsers();

      return true;
    } catch {
      setAccessManagementErrorMessage(
        documentAccessConfig.removeAccessFailedMessage,
      );

      return false;
    } finally {
      setIsAccessActionLoading(false);
    }
  }

  async function transferOwnership(
    newOwnerUsername: string,
  ): Promise<boolean> {
    if (!document || !ownerUsername) {
      return false;
    }

    const trimmedNewOwnerUsername = newOwnerUsername.trim();

    if (!trimmedNewOwnerUsername) {
      return false;
    }

    setIsAccessActionLoading(true);
    setAccessManagementErrorMessage(null);

    try {
      await transferDocumentOwnership(
        document.id,
        ownerUsername,
        trimmedNewOwnerUsername,
      );

      return true;
    } catch {
      setAccessManagementErrorMessage(
        documentAccessConfig.transferOwnershipFailedMessage,
      );

      return false;
    } finally {
      setIsAccessActionLoading(false);
    }
  }

  return {
    accessUsers,
    isLoadingAccess,
    isAccessActionLoading,
    accessManagementErrorMessage,
    reloadAccessUsers: loadAccessUsers,
    changeAccessRole,
    removeAccess,
    transferOwnership,
  };
}
