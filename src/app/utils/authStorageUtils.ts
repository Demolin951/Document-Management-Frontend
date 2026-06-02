import { AUTH_STORAGE_KEYS } from "../config/authStorageConfig";

export function saveSelectedUserId(userId: number) {
  localStorage.setItem(AUTH_STORAGE_KEYS.selectedUserId, String(userId));
}

export function getSavedSelectedUserId(): number | null {
  const savedUserId = localStorage.getItem(AUTH_STORAGE_KEYS.selectedUserId);

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
  localStorage.removeItem(AUTH_STORAGE_KEYS.selectedUserId);
}
