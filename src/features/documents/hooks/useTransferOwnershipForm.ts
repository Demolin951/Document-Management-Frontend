import { useState } from "react";
 
import type { UseTransferOwnershipFormResult } from "../types/documentAccessTypes";
 
export function useTransferOwnershipForm(): UseTransferOwnershipFormResult {
  const [newOwnerUsername, setNewOwnerUsername] = useState("");
 
  const isTransferOwnershipDisabled = !newOwnerUsername.trim();
 
  function resetTransferOwnershipState() {
    setNewOwnerUsername("");
  }
 
  return {
    newOwnerUsername,
    isTransferOwnershipDisabled,
    setNewOwnerUsername,
    resetTransferOwnershipState,
  };
}