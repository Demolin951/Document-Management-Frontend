import { useMemo } from "react";
 
import { documentAccessMockSharedUsers } from "../config/documentAccessConfig";
import type {
  AccessUser,
  AddDocumentAccessRole,
  UseDocumentAccessPreviewResult,
} from "../types/documentAccessTypes";
import type { DocumentListItem } from "../types/documentTypes";
 
export function useDocumentAccessPreview(
  document: DocumentListItem | null,
  ownerUsername: string | undefined,
): UseDocumentAccessPreviewResult {
  const accessUsers = useMemo<AccessUser[]>(() => {
    const ownerName = document?.owner ?? ownerUsername ?? "Owner";
 
    return [
      {
        id: 1,
        name: ownerName,
        username: ownerName,
        role: "Owner",
      },
      ...documentAccessMockSharedUsers,
    ];
  }, [document?.owner, ownerUsername]);
 
  function handleAccessRoleChange(
    accessUser: AccessUser,
    newRole: AddDocumentAccessRole,
  ) {
    console.info("Change access role is not connected to backend yet.", {
      accessUser,
      newRole,
    });
  }
 
  function handleRemoveAccess(accessUser: AccessUser) {
    console.info("Remove access is not connected to backend yet.", {
      accessUser,
    });
  }
 
  return {
    accessUsers,
    handleAccessRoleChange,
    handleRemoveAccess,
  };
}