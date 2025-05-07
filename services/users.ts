import { User } from "@/types";

export async function getUserByClerkId(clerkUserId: string): Promise<User> {
  const response = await fetch("/api/users?clerk_user=" + clerkUserId);
  
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  
  const user = await response.json();
  return user;
}

export async function getUserPoints(userId: string): Promise<number> {
  const response = await fetch("/api/users/points?user=" + userId);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.points;
}

export async function updateUserPoints(userId: number, newPoints: number) {
  const response = await fetch("/api/users/points", {
    method: "PATCH",
    body: JSON.stringify({ userId, newPoints }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.text();
    console.log(error)

    throw new Error(error);
  }
}