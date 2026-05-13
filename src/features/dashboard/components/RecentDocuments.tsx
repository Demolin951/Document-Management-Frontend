import DocumentListItem from "./DocumentListItem";
import { MoveRight } from "lucide-react";

const recentDocuments = [
  {
    fileName: "Invoice_2026_Q1.pdf",
    uploadDate: "2 hours ago",
    version: "v3",
  },
  {
    fileName: "Project_Requirements.pdf",
    uploadDate: "Yesturday",
    version: "v1",
  },
  {
    fileName: "Contract_Update.pdf",
    uploadDate: "3 days ago",
    version: "v5",
  },
];

function RecentDocuments() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Recent Documents
      </h2>
      <div className="space-y-1">
        {recentDocuments.map((document) => (
          <DocumentListItem
            key={document.fileName}
            fileName={document.fileName}
            uploadDate={document.uploadDate}
            version={document.version}
          />
        ))}
      </div>
      <button className="mt-4 flex items-center gap-2 self-start text-sm font-semibold text-blue-600 hover:text-blue-700">
        View all documetns
        <MoveRight size={16} strokeWidth={2.5} className="mt-0.5" />
      </button>
    </div>
  );
}

export default RecentDocuments;
