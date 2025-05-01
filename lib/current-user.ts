import { auth } from "@clerk/nextjs/server";
import type { User } from "@/types";
import { getUserByClerkId } from "@/drizzle/db/actions";

let user: User | null = null;

export async function getCurrentUser(): Promise<User> {
  if (user !== null) return user;

  const { userId, redirectToSignIn } = await auth();
  if (userId === null) return redirectToSignIn();
  
  try {
    user = await getUserByClerkId(userId);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching user data", error.message);
    }
    throw new Error("Error fetching user data");
  }

  return user;
}
