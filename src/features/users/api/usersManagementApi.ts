import { getApiErrorMessage } from "../../../shared/api/apiErrorUtils";
import type { AppUser } from "../../../shared/types/userTypes";
import type { CreateUserRequest } from "../types/userManagementApiTypes";

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
    const errorMessage = await getApiErrorMessage(
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
    const errorMessage = await getApiErrorMessage(
      response,
      "User could not be deleted.",
    );

    throw new Error(errorMessage);
  }
}
