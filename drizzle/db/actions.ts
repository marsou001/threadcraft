import { db } from ".";
import { GeneratedContent, InstagramSettings, LinkedInSettings, Users, XSettings } from "./schema";
import { desc, eq } from "drizzle-orm";
import type { GeneratedContent as Content, History, Settings } from "@/types";

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

export async function saveGeneratedContent(
  userId: string, generatedContent: string, settings: Settings
): Promise<Content> {
  console.log("Saving generated content for user", userId);
  const { socialMedia, tone, prompt, numberOfHashtags } = settings;

  const [content] = await db
    .insert(GeneratedContent)
    .values({ userId, content: generatedContent, socialMedia, tone, prompt, numberOfHashtags })
    .returning()
    .execute();

  switch(socialMedia) {
    case "X":
      const [customXSettings] = await db
        .insert(XSettings)
        .values({ generatedContentId: content.id, numberOfTweets: settings.numberOfTweets })
        .returning()
        .execute();
      return { ...content, socialMedia: "X", numberOfTweets: customXSettings.numberOfTweets }
    case "Instagram":
      const [customInstagramSettings] = await db
        .insert(InstagramSettings)
        .values({ generatedContentId: content.id, imagePrompt: settings.imagePrompt })
        .returning()
        .execute();
      return { ...content, socialMedia: "Instagram", imagePrompt: customInstagramSettings.imagePrompt }
    case "LinkedIn":
      await db
        .insert(LinkedInSettings)
        .values({ generatedContentId: content.id })
        .returning()
        .execute();
      return { ...content, socialMedia: "LinkedIn" }
  }
}

export async function getAllGeneratedContentForUser(userId: string): Promise<History> {
  console.log("Fetching content for user", userId);
// TODO: use join
  const allGeneratedContent = await db
    .select()
    .from(GeneratedContent)
    .where(eq(GeneratedContent.userId, userId))
    .orderBy(desc(GeneratedContent.createdAt))
    .execute();

  const allGeneratedContentWithCustomSettings = await Promise.all(allGeneratedContent.map(async (content) => {
    switch (content.socialMedia) {
      case "X":
        const XSettings = await getXSettingsForXContent(content.id);
        return { ...content, socialMedia: "X" as const, ...XSettings }
      case "Instagram":
        const InstagramSettings = await getInstagramSettingsForInstagramContent(content.id);
        return { ...content, socialMedia: "Instagram" as const, ...InstagramSettings }
      case "LinkedIn":
        const LinkedInSettings = await getLinkedInSettingsForLinkedInContent(content.id);
        return { ...content, socialMedia: "LinkedIn" as const, ...LinkedInSettings }
    }
  }))
  return allGeneratedContentWithCustomSettings;
}

async function getXSettingsForXContent(id: number) {
  console.log("Fetching X settings for content", id);

  const [settings] = await db
    .select()
    .from(XSettings)
    .where(eq(XSettings.generatedContentId, id))
    .execute()
  const { generatedContentId, ...rest } = settings;
  return rest;
}

async function getInstagramSettingsForInstagramContent(id: number) {
  console.log("Fetching Instagram settings for content", id);

  const [settings] = await db
    .select()
    .from(InstagramSettings)
    .where(eq(InstagramSettings.generatedContentId, id))
    .execute()
  const { generatedContentId, ...rest } = settings;
  return rest;
}

async function getLinkedInSettingsForLinkedInContent(id: number) {
  console.log("Fetching LinkedIn settings for content", id);

  const [settings] = await db
    .select()
    .from(LinkedInSettings)
    .where(eq(LinkedInSettings.generatedContentId, id))
    .execute()
  const { generatedContentId, ...rest } = settings;
  return rest;
}