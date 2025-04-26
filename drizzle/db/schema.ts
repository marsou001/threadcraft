import { integer } from "drizzle-orm/gel-core";
import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  pgEnum,
  smallint,
} from "drizzle-orm/pg-core";

const socialMediaEnum = pgEnum("social_media", ["X", "Instagram", "LinkedIn"]);
const toneEnum = pgEnum("tone", ["Casual", "Conversational", "Humorous", "Professional", "Empathetic", "Enthusiastic", "Authoritative", "Serious", "Neutral", "Joyful", "Friendly", "Encouraging"]);

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerkId", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 50 }).notNull(),
  points: smallint("points").notNull().default(50),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const GeneratedContent = pgTable("generated_content", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .references(() => Users.clerkId)
    .notNull(),
  content: text("content").notNull(),
  prompt: text("prompt").notNull(),
  tone: toneEnum("tone").notNull(),
  numberOfHashtags: smallint("number_of_hashtags").notNull(),
  socialMedia: socialMediaEnum("social_media").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const XSettings = pgTable("x_settings", {
  generatedContentId: serial("generated_content")
    .references(() => GeneratedContent.id)
    .notNull(),
  numberOfTweets: smallint("number_of_tweets").notNull(),
});

export const InstagramSettings = pgTable("instagram_settings", {
  generatedContentId: serial("generated_content")
    .references(() => GeneratedContent.id)
    .notNull(),
  imagePrompt: text("image_prompt"),
});

export const LinkedInSettings = pgTable("linkedin_settings", {
  generatedContentId: serial("generated_content")
    .references(() => GeneratedContent.id)
    .notNull(),
});