import type { LucideIcon } from "lucide-react";

export type DashboardStat ={
    title: string;
    value: number;
    subtitle: string;
    icon: LucideIcon;
};

export type RecentDocument ={
    id: string;
    fileName: string;
    updatedAt: string;
    version: number;
}

export type ActivityType =
| "upload"
| "access"
| "ownership"
| "delete"
| "edit";

export type RecentActivity ={
    id:string;
    type: ActivityType;
    message: string;
    timestamp: string;
};