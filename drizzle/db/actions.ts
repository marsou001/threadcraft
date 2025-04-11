import { db } from ".";
import { Subscriptions, Users } from "./schema";
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

export async function getUser(userId: string) {
  console.log("Fetching user ", userId);

  const [user] = await db
    .select()
    .from(Users)
    .where(eq(Users.clerkId, userId))
    .limit(1)
    .execute()
  return user;
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

export async function getUserPoints(userId: string) {
  console.log("Fetching points for user ", userId);

  const [user] = await db
    .select({ points: Users.points })
    .from(Users)
    .where(eq(Users.clerkId, userId))
    .limit(1)
    .execute()
  return user.points;
} 

export async function updateUserPoints(userId: string, newPoints: number) {
  console.log("Updating points for user ", userId);

  const [user] = await db
    .update(Users)
    .set({ points: newPoints })
    .where(eq(Users.clerkId, userId))
    .returning()
    .execute()
  return user.points;
} 