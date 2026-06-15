type VersionLabelProps = {
  version: string;
  className?: string;
};

function VersionLabel({ version, className = "" }: VersionLabelProps) {
  return (
    <span className={`inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 ${className}`}>
      {version}
    </span>
  );
}

export default VersionLabel;
