export type DocumentRefreshState = {
    documentsRefreshVersion: number;
    requestDocumentsRefresh: () => void;
};