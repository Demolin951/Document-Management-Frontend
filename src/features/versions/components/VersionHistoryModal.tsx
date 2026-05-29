import { FileText } from "lucide-react";

import DataTable from "../../../components/ui/DataTable";
import EmptyDataTableState from "../../../components/ui/EmptyDataTableState";
import Modal from "../../../components/ui/Modal";
import { versionHistoryTableColumns } from "../config/documentVersionsConfig";
import type { VersionHistoryModalProps } from "../types/documentVersionTypes";

import VersionHistoryRow from "./VersionHistoryRow";

function VersionHistoryModal({
  isOpen,
  document,
  versions,
  onClose,
  onDownloadVersion,
}: VersionHistoryModalProps) {
  const modalTitle = document
    ? `Version History: ${document.fileName}`
    : "Version History";

  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      onClose={onClose}
      panelClassName="w-[92vw] max-w-4xl"
    >
      <DataTable
        columns={versionHistoryTableColumns}
        emptyState={
          <EmptyDataTableState
            icon={FileText}
            title="No versions found"
            description="This document does not have any versions yet."
          />
        }
      >
        {versions.map((version) => (
          <VersionHistoryRow
            key={version.id}
            version={version}
            onDownloadVersion={onDownloadVersion}
          />
        ))}
      </DataTable>
    </Modal>
  );
}

export default VersionHistoryModal;
