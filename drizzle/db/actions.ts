import { db } from ".";
import { GeneratedContent, Users } from "./schema";
import { eq } from "drizzle-orm";
import { Settings } from "@/types";

export async function createUser(clerkId: string, email: string, name: string) {
  console.log("Creating user ", clerkId, email, name);

  const [newUser] = await db
    .insert(Users)
    .values({ email, name, clerkId, points: 50 })
    .returning()
    .execute();
  return newUser;
}

export async function getUser(id: number) {
  console.log("Fetching user ", id);

  const [user] = await db
    .select()
    .from(Users)
    .where(eq(Users.id, id))
    .limit(1)
    .execute()
  return user;
}

export async function getUserByClerkId(userId: string) {
  console.log("Fetching user by Clerk id", userId);

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
  console.log("Fetching points for user", userId);

  const [user] = await db
    .select({ points: Users.points })
    .from(Users)
    .where(eq(Users.clerkId, userId))
    .limit(1)
    .execute()
  return user.points;
} 

export async function updateUserPoints(userId: string, newPoints: number) {
  console.log("Updating points for user", userId);

  const [user] = await db
    .update(Users)
    .set({ points: newPoints })
    .where(eq(Users.clerkId, userId))
    .returning()
    .execute()
  return user.points;
}

export async function saveGeneratedContent(userId: string, generatedContent: string, settings: Settings) {
  console.log("Saving generated content for user", userId);

  const [content] = await db
    .insert(GeneratedContent)
    .values({ userId, content: generatedContent, ...settings })
    .returning()
    .execute();
  return content;
}

export async function getAllGeneratedContentForUser(userId: string) {
  console.log("Fetching content for user", userId);

  const allGeneratedContent = await db
    .select()
    .from(GeneratedContent)
    .where(eq(GeneratedContent.userId, userId))
    .execute();
  return allGeneratedContent;
}