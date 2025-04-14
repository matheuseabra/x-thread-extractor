import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the image schema
const tweetImageSchema = z.object({
  url: z.string().url(),
});

export type TweetImage = z.infer<typeof tweetImageSchema>;

// Define the tweet schema
export const tweetSchema = z.object({
  index: z.number(),
  text: z.string(),
  time: z.string(),
  images: z.array(tweetImageSchema).default([]),
});

export type Tweet = z.infer<typeof tweetSchema>;

export type ThreadSchema = z.infer<typeof threadSchema>;

// Database schema for threads
export const threads = pgTable("threads", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  date: text("date").notNull(),
  posts: jsonb("posts").$type<Tweet[]>().notNull(),
  originalUrl: text("original_url").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schema for threads
export const insertThreadSchema = createInsertSchema(threads).omit({
  id: true,
  createdAt: true,
});

export type InsertThread = z.infer<typeof insertThreadSchema>;

// URL validation schema
export const twitterUrlSchema = z.string().url().refine(
  (url) => {
    try {
      const parsedUrl = new URL(url);
      return (
        (parsedUrl.hostname === "twitter.com" ||
          parsedUrl.hostname === "x.com" ||
          parsedUrl.hostname === "www.twitter.com" ||
          parsedUrl.hostname === "www.x.com") &&
        parsedUrl.pathname.includes("/status/")
      );
    } catch (e) {
      return false;
    }
  },
  {
    message: "Please enter a valid Twitter/X thread URL (e.g., https://x.com/username/status/123456789)",
  }
);

export type TwitterUrl = z.infer<typeof twitterUrlSchema>;

// Define the raw API tweet structure
export const apiTweetAuthorSchema = z.object({
  type: z.string().optional(),
  userName: z.string(),
  url: z.string().url().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  isBlueVerified: z.boolean().optional(),
  profilePicture: z.string().url().optional(),
  // Add other author fields if needed
}).passthrough(); // Allow extra fields

export const apiTweetMediaSchema = z.object({
  type: z.enum(["photo", "video", "animated_gif"]),
  media_url_https: z.string().url().optional(),
  // Add other media fields if needed, e.g., video_info
}).passthrough(); // Allow extra fields

export const apiTweetEntitiesSchema = z.object({
  urls: z.array(z.object({
    display_url: z.string().optional(),
    expanded_url: z.string().url().optional(),
    url: z.string().url().optional(),
  }).passthrough()).optional(),
  // Add hashtags, user_mentions if needed
}).passthrough(); // Allow extra fields

export const apiTweetSchema = z.object({
  type: z.string().optional(),
  id: z.string(),
  url: z.string().url().optional(),
  text: z.string(),
  source: z.string().optional(),
  retweetCount: z.number().optional(),
  replyCount: z.number().optional(),
  likeCount: z.number().optional(),
  quoteCount: z.number().optional(),
  viewCount: z.number().optional(),
  createdAt: z.string(), // Keep as string initially
  lang: z.string().optional(),
  bookmarkCount: z.number().optional(),
  isReply: z.boolean().optional(),
  inReplyToId: z.string().optional().nullable(),
  conversationId: z.string().optional(),
  inReplyToUserId: z.string().optional().nullable(),
  inReplyToUsername: z.string().optional().nullable(),
  author: apiTweetAuthorSchema,
  entities: apiTweetEntitiesSchema.optional(),
  extendedEntities: z.object({
    media: z.array(apiTweetMediaSchema).optional(),
  }).passthrough().optional(),
  quoted_tweet: z.record(z.any()).optional(), // Define more strictly if needed
  retweeted_tweet: z.record(z.any()).optional(), // Define more strictly if needed
}).passthrough(); // Allow extra fields not explicitly defined

export type ApiTweet = z.infer<typeof apiTweetSchema>;

// Define the simplified thread schema (Used for client rendering and storage)
export const threadSchema = z.object({
  id: z.number().optional(), // Optional for client-side, required for DB?
  author: z.string(), // Simplified author handle (e.g., @username)
  date: z.string(), // Formatted date string
  posts: z.array(tweetSchema),
  originalUrl: z.string().url(),
});

export type Thread = z.infer<typeof threadSchema>;