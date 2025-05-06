import { auth } from "@clerk/nextjs/server";
import type { User } from "@/types";
import { getUserByClerkId } from "@/drizzle/db/actions";
import assertIsError from "@/utils/assertIsError";

let user: User | null = null;

export async function getCurrentUser(): Promise<User> {
  if (user !== null) return user;

  const { userId, redirectToSignIn } = await auth();
  if (userId === null) return redirectToSignIn();
  
  try {
    user = await getUserByClerkId(userId);
  } catch (error) {
    assertIsError(error);
    console.log("Error fetching user data", error.message);
    throw new Error("We couldn't get your data, please refresh the page");
  }

  return user;
}
