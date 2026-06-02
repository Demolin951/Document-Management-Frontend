import type { AppUser } from "../types/userTypes";

export async function getUsers(): Promise<AppUser[]> {
  const response = await fetch("/api/User");

  if (!response.ok) {
    throw new Error("Users could not be loaded.");
  }

  return response.json();
}
