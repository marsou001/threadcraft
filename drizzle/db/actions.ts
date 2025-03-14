import { db } from ".";
import { Users } from "./schema";
import { eq } from "drizzle-orm";

export async function createUser(clerkId: string, email: string, name: string) {
  console.log("Creating user ", clerkId, email, name);

  const [newUser] = await db
    .insert(Users)
    .values({ email, name, clerkId, points: 50 })
    .returning()
    .execute();
  return newUser;
}

export async function getUsersByEmail(email: string) {
  const users = await db
    .select()
    .from(Users)
    .where(eq(Users.email, email))
    .limit(1)
    .execute();
  return users;
}