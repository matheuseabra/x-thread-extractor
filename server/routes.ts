import { twitterUrlSchema } from "@shared/schema";
import type { Express, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { createServer, type Server } from "http";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { storage } from "./storage";
import { supabaseServerClient } from './supabaseServerClient';
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

  // --- Auth callback route (refactored from Next.js to Express) ---
  app.get("/api/auth/callback", async (req: Request, res: Response) => {
    const requestUrl = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
    const code = requestUrl.searchParams.get("code");
    const error_description = requestUrl.searchParams.get("error_description");

    if (error_description) {
      const supabase_error_description = encodeURIComponent(error_description);
      return res.redirect(`${requestUrl.origin}/error?error_description=${supabase_error_description}`);
    }

    if (code) {
      const response = await supabaseServerClient.auth.exchangeCodeForSession(code);

      if (response.data.user && response.data.user.email) {
        await supabaseServerClient.from("users").insert({
          id: response.data.user.id,
          username: response.data.user.user_metadata.name,
          email: response.data.user.email,
          email_confirmed_at: response.data.user.email_confirmed_at,
        });

        const { data, error: selectAvatarError } = await supabaseServerClient
          .from("users")
          .select("avatar_url")
          .eq("email", response.data.user.email)
          .single();

        if (selectAvatarError) throw selectAvatarError;

        if (!data?.avatar_url) {
          await supabaseServerClient
            .from("users")
            .update({
              email_confirmed_at: response.data.user.updated_at,
              avatar_url: response.data.user.user_metadata.avatar_url,
            })
            .eq("id", response.data.user.id);
        }
      } else {
        const error_description = encodeURIComponent("No user found after exchanging cookies for registration");
        return res.redirect(`${requestUrl.origin}/error?error_description=${error_description}`);
      }
    }

    return res.redirect(`${requestUrl}/dashboard`);
  });

  const httpServer = createServer(app);
  return httpServer;
}
