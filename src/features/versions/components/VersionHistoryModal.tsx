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
  isLoadingVersions,
  versionsErrorMessage,
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
      <div className="space-y-4">
        {versionsErrorMessage && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {versionsErrorMessage}
          </div>
        )}

        {isLoadingVersions ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Loading versions...
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </Modal>
  );
}

export default VersionHistoryModal;
