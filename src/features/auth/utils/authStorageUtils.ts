import { SELECTED_USER_STORAGE_KEYS } from "../../../app/config/selectedUserStorageConfig";
 
export function saveSelectedUserId(userId: number) {
  localStorage.setItem(SELECTED_USER_STORAGE_KEYS.selectedUserId, String(userId));
}
 
export function getSavedSelectedUserId(): number | null {
  const savedUserId = localStorage.getItem(SELECTED_USER_STORAGE_KEYS.selectedUserId);
 
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
  localStorage.removeItem(SELECTED_USER_STORAGE_KEYS.selectedUserId);
}