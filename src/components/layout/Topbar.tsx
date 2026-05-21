import { useState } from "react";
import { Bell } from "lucide-react";
import { useLocation } from "react-router";

import { useAuthStore } from "../../features/auth/store/useAuthStore";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

import { getTopbarTitle } from "./utils/getTopbarTitle";

function Topbar() {
  const selectedUser = useAuthStore((state) => state.selectedUser);
  const location = useLocation();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const topbarTitle = getTopbarTitle(location.pathname);

  function openUploadModal() {
    setIsUploadModalOpen(true);
  }

  function closeUploadModal() {
    setIsUploadModalOpen(false);
  }

  return (
    <>
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{topbarTitle}</h1>

          <p className="mt-1 text-sm font-semibold text-slate-600">
            Welcome back, {selectedUser?.name ?? "No user"}!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Bell size={18} strokeWidth={3} />
          </button>

          <Button onClick={openUploadModal}>+ Upload Document</Button>
        </div>
      </header>

      <Modal
        isOpen={isUploadModalOpen}
        title="Upload Document"
        onClose={closeUploadModal}
      >
        <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
          <p className="text-sm font-semibold text-slate-600">
            Upload document modal skeleton
          </p>

          <p className="mt-2 text-sm text-slate-500">Drag & drop UI</p>

          <div className="mt-6">
            <Button onClick={closeUploadModal}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Topbar;
