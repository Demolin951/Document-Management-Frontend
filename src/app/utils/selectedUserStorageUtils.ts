const SELECTED_USER_ID_STORAGE_KEY = "document-management-selected-user-id";

export function saveSelectedUserId(userId: number) {
  localStorage.setItem(SELECTED_USER_ID_STORAGE_KEY, String(userId));
}

export function getSavedSelectedUserId(): number | null {
  const savedUserId = localStorage.getItem(SELECTED_USER_ID_STORAGE_KEY);

  if (!savedUserId) {
    return null;
  }

  const parsedUserId = Number(savedUserId);

  if (Number.isNaN(parsedUserId)) {
    return null;
  }

  return parsedUserId;
}

export function clearSavedSelectedUserId() {
  localStorage.removeItem(SELECTED_USER_ID_STORAGE_KEY);
}
