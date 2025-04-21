import { Checkout } from "@polar-sh/express";
import {
  validateEvent,
  WebhookVerificationError,
} from "@polar-sh/sdk/webhooks";
import { twitterUrlSchema } from "@shared/schema";
import type { Express, Request, Response } from "express";
import express from "express";
import rateLimit from "express-rate-limit";
import { createServer, type Server } from "http";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { storage } from "./storage";
import { scrapeTwitterThread } from "./utils/twitterScraper";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to extract a thread
  app.post("/api/extract", limiter, async (req: Request, res: Response) => {
    try {
      // Validate URL format
      const { url } = req.body;
      const validatedUrl = twitterUrlSchema.parse(url);

      // Check if we already have this thread cached
      // const existingThread = await storage.getThreadByUrl(validatedUrl);
      // if (existingThread) {
      //   return res.json(existingThread);
      // }

      // Scrape thread content
      const thread = await scrapeTwitterThread(validatedUrl);

      // Validate the thread data against our schema
      // const validatedThread = threadSchema.parse(thread); // This ensures thread conforms to Thread type

      // console.log("Validated Thread:", JSON.stringify(validatedThread, null, 2)) // Log the validated data

      // Save to storage using the validated data
      // const savedThread = await storage.saveThread({
      //   author: validatedThread.author,
      //   date: validatedThread.date,
      //   // Ensure posts being saved match the expected structure (string time)
      //   posts: validatedThread.posts.map(post => ({
      //     index: post.index,
      //     text: post.text,
      //     time: typeof post.time === 'string' ? post.time : new Date(post.time).toLocaleTimeString('en-US', {
      //       hour: '2-digit',
      //       minute: '2-digit'
      //     }), // Convert Date back to string if needed
      //     images: post.images.map(img => ({ url: img.url }))
      //   })),
      //   originalUrl: validatedThread.originalUrl,
      // });

      // Return the validated thread data, which is guaranteed to have the correct structure
      return res.json(thread);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      } else {
        // Handle other errors
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        return res.status(500).json({ message: errorMessage });
      }
    }
  });

  // API endpoint to get thread by ID
  app.get("/api/thread/:id", limiter, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid thread ID" });
    }

    const thread = await storage.getThread(id);
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    return res.json(thread);
  });

  // API endpoint to download X videos
  app.post("/api/download/", limiter, async (req: Request, res: Response) => {
    const { url, type } = req.body;

    if (!url || !type) {
      return res.status(400).json({ message: "Missing URL or type" });
    }

    // Validate URL format
    const validatedUrl = twitterUrlSchema.parse(url);

    if (!validatedUrl) {
      return res.status(400).json({ message: "Invalid URL format" });
    }

    // Validate type
    const validTypes = [".mp4", ".mp3"];

    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ message: "Invalid type. Must be 'mp4' or 'mp3'" });
    }

    const response = await fetch("https://api.x-downloader.com/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://x-downloader.com/",
      },
      body: JSON.stringify({ url, type }),
    });

    if (!response.ok) {
      return res.status(500).json({ message: "Failed to download link" });
    }

    const videoObj = await response.json();

    if (!videoObj?.filename) {
      return res
        .status(500)
        .json({ message: "Failed to fetch video filename" });
    }

    const videoBlob = await fetch(
      `https://api.x-downloader.com/${videoObj?.filename}`
    );

    if (!videoBlob.ok) {
      return res.status(500).json({ message: "Failed to fetch video blob" });
    }
    const arrayBuffer = await videoBlob.arrayBuffer();

    // const videoBuffer = Buffer.from(arrayBuffer);
    // const videoPath = `./downloads/${videoObj.filename}`;
    // await storage.saveVideo(videoPath, videoBuffer);
    // const videoUrl = `http://localhost:3000/downloads/${videoObj.filename}`;
    // res.json({
    //   message: "Video downloaded successfully",
    //   videoUrl,
    // });

    return res.json({
      filename: videoObj.filename,
    });
  });

  // API endpoint to get highly viral and engaging tweets
  app.get("/api/tweets/viral", limiter, async (req: Request, res: Response) => {
    try {
      const minLikes = 1000;
      const minRetweets = 500;
      const minReplies = 100;

      const cursor = req.query.cursor as string | undefined;

      const query = [
        "filter:has_engagement",
        "-filter:retweets",
        "-filter:replies",
        "-filter:quote",
        `min_faves:${minLikes}`,
        `min_retweets:${minRetweets}`,
        `min_replies:${minReplies}`,
        `lang:en`,
      ].join(" ");
      const url = new URL(
        "https://api.twitterapi.io/twitter/tweet/advanced_search"
      );
      url.searchParams.append("query", query);
      url.searchParams.append("queryType", "Top");
      if (cursor) {
        url.searchParams.append("cursor", cursor);
      }
      // Optionally, add sort by engagement (if supported by API)
      const options = {
        method: "GET",
        headers: {
          "X-API-Key": "af67c3283d474406ad029d9b38b1eba3",
          Accept: "application/json",
        },
      };
      const response = await fetch(url.toString(), options);
      if (!response.ok) {
        return res
          .status(500)
          .json({ message: "Failed to fetch viral tweets" });
      }
      const data = await response.json();
      // Return only the tweets array for grid UI
      return res.json({
        tweets: data.tweets || [],
        hasNextPage: data.has_next_page,
        nextCursor: data.next_cursor,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  });

  app.get(
    "/checkout",
    Checkout({
      accessToken: "polar_oat_87vVyXQei20yxtj9XbO0UdQccf1NlgF6I3oLZ0VOqbd", // Or set an environment variable to POLAR_ACCESS_TOKEN
      successUrl: process.env.SUCCESS_URL || "http://localhost:9000/dashboard",
      server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
    })
  );

  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (req: Request, res: Response) => {
      try {
        // Convert headers to Record<string, string>
        const stringHeaders: Record<string, string> = Object.fromEntries(
          Object.entries(req.headers)
            .filter(([_, v]) => typeof v === "string" || Array.isArray(v))
            .map(([k, v]) => [k, Array.isArray(v) ? v.join(",") : v ?? ""])
        );

        const event = validateEvent(
          req.body,
          stringHeaders,
          process.env["POLAR_WEBHOOK_SECRET"] ?? ""
        );

        // Process the event
        console.log("Received event:", event);

        res.status(200).json(event);
      } catch (error) {
        if (error instanceof WebhookVerificationError) {
          res.status(403).send("");
        }
        throw error;
      }
    }
  );

  const httpServer = createServer(app);
  return httpServer;
}
