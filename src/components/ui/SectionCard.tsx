type SectionCardProps = {
  children: React.ReactNode;
};

function SectionCard({ children }: SectionCardProps) {
  return <div className="rounded-2xl bg-white p-6 shadow-sm">{children}</div>;
}

export default SectionCard;
