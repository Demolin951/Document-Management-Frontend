import { FileText, History, LayoutDashboard, Users } from "lucide-react";
 
import type { SidebarItem } from "../types/sidebarTypes";
 
const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Documents",
    icon: FileText,
    path: "/documents",
  },
  {
    label: "All Versions",
    icon: History,
    path: "/versions",
  },
  {
    label: "Users",
    icon: Users,
    path: "/users",
  },
];
 
export default sidebarItems;