import { useState } from "react";
 
import type {
  UseTransferOwnershipFormResult,
} from "../types/documentAccessTypes";
import type { DocumentListItem } from "../types/documentTypes";
 
export function useTransferOwnershipForm(): UseTransferOwnershipFormResult {
  const [newOwnerUsername, setNewOwnerUsername] = useState("");
 
  const isTransferOwnershipDisabled = !newOwnerUsername.trim();
 
  function resetTransferOwnershipState() {
    setNewOwnerUsername("");
  }
 
  function submitTransferOwnership(document: DocumentListItem | null) {
    const trimmedNewOwnerUsername = newOwnerUsername.trim();
 
    if (!document || !trimmedNewOwnerUsername) {
      return;
    }
 
    console.info("Transfer ownership is not connected to backend yet.", {
      documentId: document.id,
      fileName: document.fileName,
      newOwnerUsername: trimmedNewOwnerUsername,
    });
  }
 
  return {
    newOwnerUsername,
    isTransferOwnershipDisabled,
    setNewOwnerUsername,
    resetTransferOwnershipState,
    submitTransferOwnership,
  };
}