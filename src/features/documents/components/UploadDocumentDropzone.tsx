import { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";

import { documentUploadConfig } from "../config/documentUploadConfig";
import type {
  UploadDocumentDropzoneDragEvent,
  UploadDocumentDropzoneInputChangeEvent,
  UploadDocumentDropzoneProps,
} from "../types/documentUploadTypes";

function UploadDocumentDropzone({
  selectedFile,
  onFileSelect,
}: UploadDocumentDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  function openFileDialog() {
    fileInputRef.current?.click();
  }

  function handleInputChange(event: UploadDocumentDropzoneInputChangeEvent) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onFileSelect(file);

    event.target.value = "";
  }

  function handleDragOver(event: UploadDocumentDropzoneDragEvent) {
    event.preventDefault();
    setIsDragActive(true);
  }

  function handleDragLeave(event: UploadDocumentDropzoneDragEvent) {
    event.preventDefault();
    setIsDragActive(false);
  }

  function handleDrop(event: UploadDocumentDropzoneDragEvent) {
    event.preventDefault();
    setIsDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    onFileSelect(file);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rounded-2xl border-2 border-dashed px-8 py-12 text-center transition ${
        isDragActive
          ? "border-blue-400 bg-blue-50"
          : "border-slate-300 bg-white"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={documentUploadConfig.acceptedFileTypes}
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-blue-600">
        <CloudUpload size={34} strokeWidth={2.5} />
      </div>

      <p className="mt-5 text-sm font-bold text-slate-700">
        {documentUploadConfig.dropzoneTitle}
      </p>

      <p className="mt-3 text-sm font-semibold text-slate-400">
        {documentUploadConfig.dropzoneDividerText}
      </p>

      <button
        type="button"
        onClick={openFileDialog}
        className="mt-4 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-blue-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
      >
        {documentUploadConfig.chooseFileButtonText}
      </button>

      {selectedFile && (
        <p className="mt-5 truncate text-sm font-semibold text-slate-600">
          {documentUploadConfig.selectedFileLabel}:{" "}
          <span title={selectedFile.name} className="text-slate-900">
            {selectedFile.name}
          </span>
        </p>
      )}
    </div>
  );
}

export default UploadDocumentDropzone;
