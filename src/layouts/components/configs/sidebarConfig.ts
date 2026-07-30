import { FileText, History, LayoutDashboard, Users } from "lucide-react";

import type { NavigationItem } from "../types/sidebarTypes";

const sidebarItems: NavigationItem[] = [
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
    requiresAdmin: true,
  },
];

export default sidebarItems;
