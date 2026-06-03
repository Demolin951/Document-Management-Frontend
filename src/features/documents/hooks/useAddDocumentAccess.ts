import { useState } from "react";

import type { DocumentListItem } from "../../../shared/types/documentTypes";

import { addDocumentAccess } from "../api/documentAccessApi";
import { documentAccessConfig } from "../config/documentAccessModalConfig";
import type { AddDocumentAccessRole } from "../types/documentAccessApiTypes";
import type { UseAddDocumentAccessResult } from "../types/documentAccessHookTypes";

export function useAddDocumentAccess(): UseAddDocumentAccessResult {
  const [targetUserName, setTargetUserName] = useState("");
  const [selectedRole, setSelectedRole] =
    useState<AddDocumentAccessRole>("Viewer");
  const [isAddingAccess, setIsAddingAccess] = useState(false);
  const [addAccessErrorMessage, setAddAccessErrorMessage] = useState<
    string | null
  >(null);

  function resetAddAccessState() {
    setTargetUserName("");
    setSelectedRole("Viewer");
    setIsAddingAccess(false);
    setAddAccessErrorMessage(null);
  }

  async function submitAddAccess(
    document: DocumentListItem | null,
    ownerUsername: string | undefined,
  ): Promise<boolean> {
    if (!document) {
      setAddAccessErrorMessage(documentAccessConfig.noDocumentSelectedMessage);
      return false;
    }

    if (!ownerUsername) {
      setAddAccessErrorMessage(documentAccessConfig.noOwnerSelectedMessage);
      return false;
    }

    const trimmedTargetUserName = targetUserName.trim();

    if (!trimmedTargetUserName) {
      setAddAccessErrorMessage(
        documentAccessConfig.targetUsernameRequiredMessage,
      );
      return false;
    }

    setIsAddingAccess(true);
    setAddAccessErrorMessage(null);

    try {
      await addDocumentAccess({
        documentId: document.id,
        ownerUsername,
        targetUserName: trimmedTargetUserName,
        role: selectedRole,
      });

      resetAddAccessState();
      return true;
    } catch {
      setAddAccessErrorMessage(documentAccessConfig.addAccessFailedMessage);
      return false;
    } finally {
      setIsAddingAccess(false);
    }
  }

  return {
    targetUserName,
    selectedRole,
    isAddingAccess,
    addAccessErrorMessage,
    setTargetUserName,
    setSelectedRole,
    resetAddAccessState,
    submitAddAccess,
  };
}
