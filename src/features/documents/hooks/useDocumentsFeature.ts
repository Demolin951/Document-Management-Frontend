import type { DocumentActionKey } from "../types/documentActionTypes";
import type { DocumentListItem } from "../types/documentTypes";
import { useDocuments } from "./useDocuments";
import { useDocumentAccessFeature } from "./useDocumentAccessFeature";
import { useDocumentDownloadFeature } from "./useDocumentDownloadFeature";
import { useDocumentUploadFeature } from "./useDocumentUploadFeature";
import { useDocumentRefreshStore } from "../store/useDocumentRefreshStore";

export function useDocumentsFeature(username: string | undefined) {
  const refreshVersion = useDocumentRefreshStore(
    (state) => state.documentsRefreshVersion,
  );

  const { documents, isLoadingDocuments, documentsErrorMessage } = useDocuments(
    username,
    refreshVersion,
  );

  const uploadFeature = useDocumentUploadFeature(username);
  const accessFeature = useDocumentAccessFeature(username);
  const downloadFeature = useDocumentDownloadFeature(username);

  const isFeatureLoading =
    isLoadingDocuments ||
    downloadFeature.isDocumentActionLoading ||
    uploadFeature.isUploading ||
    accessFeature.isAddingAccess;

  const featureError =
    documentsErrorMessage ||
    accessFeature.accessErrorMessage ||
    uploadFeature.uploadErrorMessage ||
    downloadFeature.downloadErrorMessage;

  async function handleDocumentAction(
    actionKey: DocumentActionKey,
    document: DocumentListItem,
  ) {
    if (actionKey === "manageAccess") {
      accessFeature.openManageAccessModal(document);
      return;
    }

    if (actionKey === "download") {
      await downloadFeature.downloadDocument(document);
      return;
    }

    console.info(`Action "${actionKey}" is not implemented yet.`, document);
  }

  return {
    documents,
    isLoadingDocuments,
    isFeatureLoading,
    featureError,
    isDocumentActionLoading: downloadFeature.isDocumentActionLoading,
    handleDocumentAction,

    isUploadModalOpen: uploadFeature.isUploadModalOpen,
    openUploadModal: uploadFeature.openUploadModal,
    closeUploadModal: uploadFeature.closeUploadModal,
    selectedFile: uploadFeature.selectedFile,
    selectFile: uploadFeature.selectFile,
    isUploading: uploadFeature.isUploading,
    submitUpload: uploadFeature.submitUpload,

    selectedDocumentForAccess: accessFeature.selectedDocumentForAccess,
    closeManageAccessModal: accessFeature.closeManageAccessModal,
    targetUserName: accessFeature.targetUserName,
    setTargetUserName: accessFeature.setTargetUserName,
    selectedRole: accessFeature.selectedRole,
    setSelectedRole: accessFeature.setSelectedRole,
    isAddingAccess: accessFeature.isAddingAccess,
    submitManageAccess: accessFeature.submitManageAccess,
  };
}
