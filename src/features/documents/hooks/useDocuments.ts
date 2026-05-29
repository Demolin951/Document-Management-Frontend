import { useCallback, useEffect, useState } from "react";
 
import { getDocumentsByUsername } from "../api/documentsApi";
import type { DocumentListItem } from "../types/documentTypes";
import type { UseDocumentsResult } from "../types/useDocumentsTypes";
 
export function useDocuments(username: string | undefined): UseDocumentsResult {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
  const [documentsErrorMessage, setDocumentsErrorMessage] = useState<
    string | null
>(null);
 
  const reloadDocuments = useCallback(async () => {
    if (!username) {
      setDocuments([]);
      setDocumentsErrorMessage(null);
      setIsLoadingDocuments(false);
      return;
    }
 
    setIsLoadingDocuments(true);
    setDocumentsErrorMessage(null);
 
    try {
      const loadedDocuments = await getDocumentsByUsername(username);
 
      setDocuments(loadedDocuments);
    } catch {
      setDocuments([]);
      setDocumentsErrorMessage("Documents could not be loaded.");
    } finally {
      setIsLoadingDocuments(false);
    }
  }, [username]);
 
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void reloadDocuments();
    }, 0);
 
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [reloadDocuments]);
 
  return {
    documents,
    isLoadingDocuments,
    documentsErrorMessage,
    reloadDocuments,
  };
}