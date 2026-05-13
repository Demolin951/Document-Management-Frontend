import { NavLink } from "react-router";

type SidebarNavItemProps = {
  label: string;
  icon: React.ElementType;
  path: string;
};

function SidebarNavItem({ label, icon: Icon, path }: SidebarNavItemProps) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`
        }
      >
        <Icon size={18} className="shrink-0" />
        <span>{label}</span>
      </NavLink>
    </li>
  );
}

export default SidebarNavItem;
