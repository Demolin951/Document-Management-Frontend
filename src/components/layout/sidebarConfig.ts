import{
    LayoutDashboard,
    FileText,
    Share2,
    History,
    Users,
    ClipboardList,
    Settings,
} from "lucide-react";

type SidebarItem = {
    label:string;
    icon: React.ElementType;
    isActive?: boolean;
};

const sidebarItems: SidebarItem[] = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        isActive: true,
    },
    {
        label: "Documents",
        icon: FileText,
    },
    {
        label: "Shared with me",
        icon: Share2,
    },
    {
        label: "All Versions",
        icon: History,
    },
    {
        label: "Users",
        icon: Users,
    },
    {
        label: "Audit Log",
        icon: ClipboardList,
    },
    {
        label: "Settings",
        icon: Settings,
    }
]

export default sidebarItems;