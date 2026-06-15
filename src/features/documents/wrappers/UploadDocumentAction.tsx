import { useState } from "react";

import Button from "../../../shared/components/ui/Button";

import UploadDocumentModal from "../components/UploadDocumentModal";

type UploadDocumentActionProps = {
  selectedUsername?: string;
};

function UploadDocumentAction({ selectedUsername }: UploadDocumentActionProps) {
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
        selectedUsername={selectedUsername}
        onClose={closeUploadModal}
      />
    </>
  );
}

export default UploadDocumentAction;
