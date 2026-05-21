import { useState } from "react";

import { addDocumentAccess } from "../api/documentAccessApi";
import { documentAccessConfig } from "../config/documentAccessConfig";
import { useDocumentRefreshStore } from "../store/useDocumentRefreshStore";
import type { AddDocumentAccessRole } from "../types/documentAccessTypes";
import type { DocumentListItem } from "../types/documentTypes";

export function useDocumentAccessFeature(username: string | undefined) {
  const requestDocumentsRefresh = useDocumentRefreshStore(
    (state) => state.requestDocumentsRefresh,
  );

  const [selectedDocumentForAccess, setSelectedDocumentForAccess] =
    useState<DocumentListItem | null>(null);
  const [targetUserName, setTargetUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState<AddDocumentAccessRole>("Viewer");
  const [isAddingAccess, setIsAddingAccess] = useState(false);
  const [accessErrorMessage, setAccessErrorMessage] = useState<string | null>(null);

  function openManageAccessModal(document: DocumentListItem) {
    setAccessErrorMessage(null);
    setSelectedDocumentForAccess(document);
  }

  function closeManageAccessModal() {
    setTargetUserName("");
    setSelectedRole("Viewer");
    setAccessErrorMessage(null);
    setSelectedDocumentForAccess(null);
  }

  async function submitManageAccess() {
    if (!selectedDocumentForAccess) {
      setAccessErrorMessage(documentAccessConfig.noDocumentSelectedMessage);
      return false;
    }

    if (!username) {
      setAccessErrorMessage(documentAccessConfig.noOwnerSelectedMessage);
      return false;
    }

    const trimmedTargetUserName = targetUserName.trim();
    if (!trimmedTargetUserName) {
      setAccessErrorMessage(documentAccessConfig.targetUsernameRequiredMessage);
      return false;
    }

    setIsAddingAccess(true);
    setAccessErrorMessage(null);

    try {
      await addDocumentAccess({
        documentId: selectedDocumentForAccess.id,
        ownerUsername: username,
        targetUserName: trimmedTargetUserName,
        role: selectedRole,
      });
      requestDocumentsRefresh();
      closeManageAccessModal();
      return true;
    } catch {
      setAccessErrorMessage(documentAccessConfig.addAccessFailedMessage);
      return false;
    } finally {
      setIsAddingAccess(false);
    }
  }

  return {
    selectedDocumentForAccess,
    openManageAccessModal,
    closeManageAccessModal,
    targetUserName,
    setTargetUserName,
    selectedRole,
    setSelectedRole,
    isAddingAccess,
    accessErrorMessage,
    submitManageAccess,
  };
}
