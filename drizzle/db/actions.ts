import { db } from ".";
import { GeneratedContent, InstagramSettings, LinkedInSettings, Subscriptions, Users, XSettings } from "./schema";
import { and, desc, eq } from "drizzle-orm";
import type { GeneratedContent as Content, History, Settings, Subscription, User } from "@/types";

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

export async function getUserByClerkId(userId: string): Promise<User> {
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

export async function getUserByStripeCustomerId(customerId: string) {
  const [user] = await db
    .select()
    .from(Users)
    .where(eq(Users.stripeCustomerId, customerId))
    .limit(1)
    .execute();
  return user;
}

export async function getUserPoints(id: number) {
  console.log("Fetching points for user", id);

  const [user] = await db
    .select({ points: Users.points })
    .from(Users)
    .where(eq(Users.id, id))
    .limit(1)
    .execute()
  return user.points;
}

export async function getUserSubscription(id: number): Promise<Subscription | undefined> {
  console.log("Fetching subscription for user", id);

  const [subscription] = await db
    .select()
    .from(Subscriptions)
    .where(eq(Subscriptions.user, id))
    .limit(1)
    .execute()
  return subscription;
}

export async function updateUser(id: number, values: Partial<User>) {
  console.log("Updating user", id);

  const [user] = await db
    .update(Users)
    .set(values)
    .where(eq(Users.id, id))
    .returning()
    .execute()
  return user;
}

export async function updateUserPoints(id: number, newPoints: number) {
  console.log("Updating points for user", id);

  const [user] = await db
    .update(Users)
    .set({ points: newPoints })
    .where(eq(Users.id, id))
    .returning()
    .execute()
  return user.points;
}

export async function setStripeCustomerId(id: number, stripeCustomerId: string) {
  console.log("Setting Stripe customer id for user", id);

  const [user] = await db
    .update(Users)
    .set({ stripeCustomerId })
    .where(eq(Users.id, id))
    .returning()
    .execute()
  return user;
}

export async function createSubscription(values: Omit<Subscription, "id">) {
  console.log("Creating subscription for user", values.user);

  const [newSubscription] = await db
    .insert(Subscriptions)
    .values(values)
    .returning()
    .execute();
  return newSubscription;
}

export async function updateSubscription(subscriptionId: string, values: Pick<Subscription, "priceId">) {
  console.log("Update subscription", subscriptionId);

  const [updatedSubscription] = await db
    .update(Subscriptions)
    .set(values)
    .where(eq(Subscriptions.subscriptionId, subscriptionId))
    .returning()
    .execute()
  return updatedSubscription;
}

export async function deleteSubscription(subscriptionId: string) {
  console.log("Delete subscription", subscriptionId);

  const [deletedSubscription] = await db
    .delete(Subscriptions)
    .where(eq(Subscriptions.subscriptionId, subscriptionId))
    .returning()
    .execute()
  return deletedSubscription;
}

export async function saveGeneratedContent(
  user: number, generatedContent: string, settings: Settings
): Promise<Content> {
  console.log("Saving generated content for user", user);
  const { socialMedia, tone, prompt, numberOfHashtags } = settings;

  const [content] = await db
    .insert(GeneratedContent)
    .values({ user, content: generatedContent, socialMedia, tone, prompt, numberOfHashtags })
    .returning()
    .execute();

  switch(socialMedia) {
    case "X":
      const [customXSettings] = await db
        .insert(XSettings)
        .values({ generatedContentId: content.id, numberOfTweets: settings.numberOfTweets, maxCharactersCountPerTweet: settings.maxCharactersCountPerTweet })
        .returning()
        .execute();
      return { ...content, socialMedia: "X", numberOfTweets: customXSettings.numberOfTweets, maxCharactersCountPerTweet: settings.maxCharactersCountPerTweet }
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

export async function getAllGeneratedContentForUser(id: number): Promise<History> {
  console.log("Fetching content for user", id);

  const allGeneratedContent = await db
    .select()
    .from(GeneratedContent)
    .leftJoin(XSettings, and(eq(GeneratedContent.id, XSettings.generatedContentId), eq(GeneratedContent.socialMedia, "X")))
    .leftJoin(InstagramSettings, and(eq(GeneratedContent.id, InstagramSettings.generatedContentId), eq(GeneratedContent.socialMedia, "Instagram")))
    .leftJoin(LinkedInSettings, and(eq(GeneratedContent.id, LinkedInSettings.generatedContentId), eq(GeneratedContent.socialMedia, "LinkedIn")))
    .where(eq(GeneratedContent.user, id))
    .orderBy(desc(GeneratedContent.createdAt))
    .execute();

  const formatedContent = allGeneratedContent.map((content) => {
    switch(content.generated_content.socialMedia) {
      case "X":
        return {...content.generated_content, socialMedia: "X" as const, ...content.x_settings! }
      case "Instagram":
        return {...content.generated_content, socialMedia: "Instagram" as const, ...content.instagram_settings! }
      case "LinkedIn":
        return {...content.generated_content, socialMedia: "LinkedIn" as const, ...content.linkedin_settings! }
      default:
        return {...content.generated_content, socialMedia: "LinkedIn" as const, ...content.linkedin_settings! }
    }
  })

  return formatedContent;
}