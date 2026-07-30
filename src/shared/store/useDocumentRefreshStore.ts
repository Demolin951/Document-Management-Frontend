import { create } from "zustand";

import type { DocumentRefreshState } from "../types/documentRefreshTypes";

export const useDocumentRefreshStore = create<DocumentRefreshState>((set) => ({
  documentsRefreshVersion: 0,

  requestDocumentsRefresh: () => {
    set((state) => ({
      documentsRefreshVersion: state.documentsRefreshVersion + 1,
    }));
  },
}));
