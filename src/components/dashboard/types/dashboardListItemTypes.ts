import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type DashboardListItemProps = {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    iconBgClass: string;
    iconTextClass: string;
    rightContent?: ReactNode;
};