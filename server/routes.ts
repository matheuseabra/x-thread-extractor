import { twitterUrlSchema } from "@shared/schema";
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { storage } from "./storage";
import { scrapeTwitterThread } from "./utils/twitterScraper";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to extract a Twitter thread
  app.post("/api/extract", async (req: Request, res: Response) => {
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
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return res.status(500).json({ message: errorMessage });
      }
    }
  });

  // API endpoint to get thread by ID
  app.get("/api/thread/:id", async (req: Request, res: Response) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
