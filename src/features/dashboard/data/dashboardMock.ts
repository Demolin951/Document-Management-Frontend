import{
    FileText, Users, ShieldCheck, Activity,
} from "lucide-react";
import type { DashboardStat, RecentDocument, RecentActivity } from "../types/dashboardTypes";

export const dashboardStats: DashboardStat[] = [
    {
        title: "Total Documents",
        value: 128,
        subtitle: "+12 this month",
        icon: FileText,            
    },
        {
        title: "Active Users",
        value: 24,
        subtitle: "+3 this week",
        icon: Users,            
    },
        {
        title: "Access Roles",
        value: 56,
        subtitle: "8 owner roles",
        icon: ShieldCheck,            
    },
        {
        title: "Audit Events",
        value: 312,
        subtitle: "+18 today",
        icon: Activity,            
    },
];

export const recentDocument: RecentDocument[] = [
    {
        id: "doc-1",
        fileName: "Invoice_2026_Q1.pdf",
        updatedAt: "2 hours ago",
        version: 3,
    },
        {
        id: "doc-2",
        fileName: "Project_Requirements.pdf",
        updatedAt: "Yesturday",
        version: 1,
    },
        {
        id: "doc-3",
        fileName: "Contract_Update.pdf",
        updatedAt: "3 days ago",
        version: 5,
    },
]

export const RecentActivities: RecentActivity[] = [
    {
        id: "activity-1",
        type: "upload",
        message: "Max uploaded new version of Project_Plan.pdf",
        timestamp: "09.05.2026 14:32",
    },
    {
        id: "activity-2",
        type: "access",
        message: "Anna was added to Project_Plan.pdf",
        timestamp: "09.05.2026 13:10",
    },
    {
        id: "activity-3",
        type: "ownership",
        message: "Ownership of Architecture.pdf transfered",
        timestamp: "10.05.2026 14:10",
    },
]