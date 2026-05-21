import { useState } from "react";

import { addDocumentAccess } from "../api/documentAccessApi";
import { downloadLatestDocumentVersion } from "../api/documentDownloadApi";
import { uploadDocument } from "../api/documentUploadApi";
import { documentAccessConfig } from "../config/documentAccessConfig";
import { documentUploadConfig } from "../config/documentUploadConfig";
import { useDocumentRefreshStore } from "../store/useDocumentRefreshStore";
import type { DocumentActionKey } from "../types/documentActionTypes";
import type { AddDocumentAccessRole } from "../types/documentAccessTypes";
import type { DocumentListItem } from "../types/documentTypes";
import { validateUploadFile } from "../utils/documentUploadUtils";
import { saveBlobAsFile } from "../utils/documentDownloadUtils";
import { useDocuments } from "./useDocuments";

export function useDocumentsFeature(username: string | undefined) {
  const refreshVersion = useDocumentRefreshStore(
    (state) => state.documentsRefreshVersion,
  );
  const requestDocumentsRefresh = useDocumentRefreshStore(
    (state) => state.requestDocumentsRefresh,
  );

  const { documents, isLoadingDocuments, documentsErrorMessage } = useDocuments(
    username,
    refreshVersion,
  );

  const [featureErrorMessage, setFeatureErrorMessage] = useState<string | null>(null);
  const [isDocumentActionLoading, setIsDocumentActionLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isManageAccessModalOpen, setIsManageAccessModalOpen] = useState(false);
  const [selectedDocumentForAccess, setSelectedDocumentForAccess] =
    useState<DocumentListItem | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [targetUserName, setTargetUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState<AddDocumentAccessRole>("Viewer");
  const [isAddingAccess, setIsAddingAccess] = useState(false);

  const isFeatureLoading = isLoadingDocuments || isDocumentActionLoading || isUploading || isAddingAccess;
  const featureError = documentsErrorMessage || featureErrorMessage;

  function openUploadModal() {
    setFeatureErrorMessage(null);
    setIsUploadModalOpen(true);
  }

  function closeUploadModal() {
    setSelectedFile(null);
    setFeatureErrorMessage(null);
    setIsUploadModalOpen(false);
  }

  function selectFile(file: File) {
    const validationResult = validateUploadFile(file);

    if (!validationResult.isValid) {
      setSelectedFile(null);
      setFeatureErrorMessage(validationResult.errorMessage);
      return;
    }

    setSelectedFile(file);
    setFeatureErrorMessage(null);
  }

  async function submitUpload() {
    if (!selectedFile) {
      setFeatureErrorMessage(documentUploadConfig.noFileSelectedMessage);
      return false;
    }

    if (!username) {
      setFeatureErrorMessage(documentUploadConfig.noUserSelectedMessage);
      return false;
    }

    setIsUploading(true);
    setFeatureErrorMessage(null);

    try {
      await uploadDocument({ file: selectedFile, username });
      requestDocumentsRefresh();
      closeUploadModal();
      return true;
    } catch {
      setFeatureErrorMessage(documentUploadConfig.uploadFailedMessage);
      return false;
    } finally {
      setIsUploading(false);
    }
  }

  function openManageAccessModal(document: DocumentListItem) {
    setFeatureErrorMessage(null);
    setSelectedDocumentForAccess(document);
    setIsManageAccessModalOpen(true);
  }

  function closeManageAccessModal() {
    setTargetUserName("");
    setSelectedRole("Viewer");
    setFeatureErrorMessage(null);
    setSelectedDocumentForAccess(null);
    setIsManageAccessModalOpen(false);
  }

  async function submitManageAccess() {
    if (!selectedDocumentForAccess) {
      setFeatureErrorMessage(documentAccessConfig.noDocumentSelectedMessage);
      return false;
    }
    if (!username) {
      setFeatureErrorMessage(documentAccessConfig.noOwnerSelectedMessage);
      return false;
    }

    const trimmedTargetUserName = targetUserName.trim();
    if (!trimmedTargetUserName) {
      setFeatureErrorMessage(documentAccessConfig.targetUsernameRequiredMessage);
      return false;
    }

    setIsAddingAccess(true);
    setFeatureErrorMessage(null);

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
      setFeatureErrorMessage(documentAccessConfig.addAccessFailedMessage);
      return false;
    } finally {
      setIsAddingAccess(false);
    }
  }

  async function handleDocumentAction(actionKey: DocumentActionKey, document: DocumentListItem) {
    setFeatureErrorMessage(null);

    if (actionKey === "manageAccess") {
      openManageAccessModal(document);
      return;
    }

    setIsDocumentActionLoading(true);
    try {
      if (!username) {
        setFeatureErrorMessage("Please select a user before downloading.");
        return;
      }
      if (actionKey === "download") {
        const fileBlob = await downloadLatestDocumentVersion(document.id, username);
        saveBlobAsFile(fileBlob, document.fileName);
      }
    } catch {
      setFeatureErrorMessage("Document action could not be completed.");
    } finally {
      setIsDocumentActionLoading(false);
    }
  }

  return {
    documents,
    isLoadingDocuments,
    isFeatureLoading,
    featureError,
    isDocumentActionLoading,
    handleDocumentAction,
    isUploadModalOpen,
    openUploadModal,
    closeUploadModal,
    selectedFile,
    selectFile,
    isUploading,
    submitUpload,
    isManageAccessModalOpen,
    selectedDocumentForAccess,
    closeManageAccessModal,
    targetUserName,
    setTargetUserName,
    selectedRole,
    setSelectedRole,
    isAddingAccess,
    submitManageAccess,
  };
}
