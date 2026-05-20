import type { DocumentRole } from "../types/documentTypes";
import { documentActionConfig } from "../config/documentActionConfig";

export function getAvailableDocumentActions(role: DocumentRole){
    return documentActionConfig.filter((action) =>
        action.allowedRoles.includes(role));
}