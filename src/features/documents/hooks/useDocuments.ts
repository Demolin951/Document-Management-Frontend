import { useEffect, useState } from "react";
 
import { getDocumentsByUsername } from "../api/documentsApi";
import type { DocumentListItem } from "../types/documentTypes";
import type { UseDocumentsResult } from "../types/useDocumentsTypes";
 
export function useDocuments(
  username: string | undefined,
  refreshVersion = 0
): UseDocumentsResult {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
  const [documentsErrorMessage, setDocumentsErrorMessage] = useState<
    string | null
>(null);
 
  useEffect(() => {
    if (!username) {
      return;
    }
 
    let isCurrentRequest = true;
 
    async function loadDocuments() {
      setIsLoadingDocuments(true);
      setDocumentsErrorMessage(null);
 
      try {
        const loadedDocuments = await getDocumentsByUsername(username);
 
        if (!isCurrentRequest) {
          return;
        }
 
        setDocuments(loadedDocuments);
      } catch {
        if (!isCurrentRequest) {
          return;
        }
 
        setDocuments([]);
        setDocumentsErrorMessage("Documents could not be loaded.");
      } finally {
        if (isCurrentRequest) {
          setIsLoadingDocuments(false);
        }
      }
    }
 
    loadDocuments();
 
    return () => {
      isCurrentRequest = false;
    };
  }, [username, refreshVersion]);
 
  if (!username) {
    return {
      documents: [],
      isLoadingDocuments: false,
      documentsErrorMessage: null,
    };
  }
 
  return {
    documents,
    isLoadingDocuments,
    documentsErrorMessage,
  };
}