import { useState } from "react";

import { useAuthStore } from "../../../app/store/useAuthStore";
import Button from "../../../components/ui/Button";

import UploadDocumentModal from "../components/UploadDocumentModal";

function UploadDocumentAction() {
  const selectedUser = useAuthStore((state) => state.selectedUser);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  function openUploadModal() {
    setIsUploadModalOpen(true);
  }

  function closeUploadModal() {
    setIsUploadModalOpen(false);
  }

  return (
    <>
      <Button onClick={openUploadModal}>+ Upload Document</Button>

      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        selectedUsername={selectedUser?.name}
        onClose={closeUploadModal}
      />
    </>
  );
}

export default UploadDocumentAction;
