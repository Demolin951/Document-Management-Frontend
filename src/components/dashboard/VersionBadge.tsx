import type { VersionBadgeProps } from "./types/versionBadgeTypes";

function VersionBadge({ version }: VersionBadgeProps) {
  return (
    <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
      {version}
    </div>
  );
}

export default VersionBadge;
