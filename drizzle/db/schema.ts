import {
  pgTable,
  integer,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

const socialMediaEnum = pgEnum("social_media", ["X", "Instagram", "LinkedIn"]);

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerkId").unique(),
  email: text("email").notNull().unique(),
  name: text("name"),
  points: integer("points").default(50),
  createdAt: timestamp("created_at").defaultNow(),
});

export const GeneratedContent = pgTable("generated_content", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => Users.id)
    .notNull(),
  content: text("content").notNull(),
  prompt: text("prompt").notNull(),
  socialMedia: socialMediaEnum(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});