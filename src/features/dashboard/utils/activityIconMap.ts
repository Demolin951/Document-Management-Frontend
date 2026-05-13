import {Crown, FileUp, Pencil, ShieldCheck, Trash2} from "lucide-react";
import type { ActivityType } from "../types/dashboardTypes";

export function getActivityIcon(type: ActivityType){
    switch (type){
        case "upload":
            return FileUp;

        case "access":
            return ShieldCheck;
            
        case "ownership":
            return Crown;
            
        case "delete":
            return Trash2;
            
        case "edit":
            return Pencil;    
    }
}