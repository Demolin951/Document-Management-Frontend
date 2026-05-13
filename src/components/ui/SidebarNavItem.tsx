type SidebarNavItemProbs = {
  label: string;
  isActive?: boolean;
  icon: React.ElementType;
};

function SidebarNavItem({
  label,
  icon: Icon,
  isActive = false,
}: SidebarNavItemProbs) {
  return (
    <li>
      <button
        className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </button>
    </li>
  );
}

export default SidebarNavItem;
