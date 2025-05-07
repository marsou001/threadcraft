import { auth } from "@clerk/nextjs/server";
import type { User } from "@/types";
import { getUserByClerkId } from "@/drizzle/db/actions";
import assertIsError from "@/utils/assertIsError";

export async function getCurrentUser() {
  const { userId, redirectToSignIn } = await auth();
  if (userId === null) return redirectToSignIn();
  
  let user: User;
  try {
    user = await getUserByClerkId(userId);
  } catch (error) {
    assertIsError(error);
    console.log("Error fetching user data", error.message);
    throw new Error("We couldn't get your data, please refresh the page");
  }

  return user;
}
