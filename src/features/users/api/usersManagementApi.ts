import type { AppUser } from "../../auth/types/authTypes";
import type { CreateUserRequest } from "../types/userManagementTypes";

async function getUserManagementErrorMessage(
  response: Response,
  fallbackMessage: string,
): Promise<string> {
  return response
    .json()
    .then((body: { title?: string; detail?: string }) => {
      return body.detail ?? body.title ?? fallbackMessage;
    })
    .catch(() => fallbackMessage);
}

export async function getManagedUsers(): Promise<AppUser[]> {
  const response = await fetch("/api/User");

  if (!response.ok) {
    throw new Error("Users could not be loaded.");
  }

  return response.json();
}

export async function createManagedUser(
  username: string,
  currentUsername: string,
): Promise<AppUser> {
  const query = new URLSearchParams({
    currentUsername,
  });

  const requestBody: CreateUserRequest = {
    userName: username,
  };

  const response = await fetch(`/api/User/create?${query.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorMessage = await getUserManagementErrorMessage(
      response,
      "User could not be created.",
    );

    throw new Error(errorMessage);
  }

  return response.json();
}

export async function deleteManagedUser(
  userId: number,
  currentUsername: string,
): Promise<void> {
  const query = new URLSearchParams({
    currentUsername,
  });

  const response = await fetch(
    `/api/User/delete/${userId}?${query.toString()}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const errorMessage = await getUserManagementErrorMessage(
      response,
      "User could not be deleted.",
    );

    throw new Error(errorMessage);
  }
}
