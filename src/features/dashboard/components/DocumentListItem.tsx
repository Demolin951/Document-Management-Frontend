import { FileText } from "lucide-react";

type DocumentListItemProps = {
  fileName: string;
  uploadDate: string;
  version: string;
};

function DocumentListItem({
  fileName,
  uploadDate,
  version,
}: DocumentListItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-x1 px-2 py-3 transition-colors hover:bg-slate-50">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
        <FileText size={16} strokeWidth={2.4} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">
          {fileName}
        </p>
        <p className="text-xs text-slate-500">{uploadDate}</p>
      </div>

      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
        {version}
      </span>
    </div>
  );
}

export default DocumentListItem;
