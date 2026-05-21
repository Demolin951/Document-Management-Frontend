import{
    LayoutDashboard,
    FileText,
    Share2,
    History,
    Users,
    ClipboardList,
    Settings,
} from "lucide-react";

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
        path: "/documents"
    },
    {
        label: "Shared with me",
        icon: Share2,
        path: "/shared"
    },
    {
        label: "All Versions",
        icon: History,
        path: "/versions"
    },
    {
        label: "Users",
        icon: Users,
        path: "/users"
    },
    {
        label: "Audit Log",
        icon: ClipboardList,
        path: "/audit"
    },
    {
        label: "Settings",
        icon: Settings,
        path: "/settings"
    }
]

export default sidebarItems;