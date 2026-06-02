import type { AppUser } from "../../../shared/types/userTypes";

export async function getUsers(): Promise<AppUser[]>{
    const response = await fetch("/api/User");

    if (!response.ok){
        throw new Error("User could not be loaded");
    }

    return response.json();
}