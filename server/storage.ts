import { InsertThread, Thread, Tweet, TweetImage } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getThread(id: number): Promise<Thread | undefined>;
  getThreadByUrl(url: string): Promise<Thread | undefined>;
  saveThread(thread: InsertThread): Promise<Thread>;
  getAllThreads(): Promise<Thread[]>;
}

export class MemStorage implements IStorage {
  private threads: Map<number, Thread>;
  private urlIndex: Map<string, number>;
  private currentId: number;

  constructor() {
    this.threads = new Map();
    this.urlIndex = new Map();
    this.currentId = 1;
  }

  async getThread(id: number): Promise<Thread | undefined> {
    return this.threads.get(id);
  }

  async getThreadByUrl(url: string): Promise<Thread | undefined> {
    const id = this.urlIndex.get(url);
    if (id) {
      return this.threads.get(id);
    }
    return undefined;
  }

  async saveThread(insertThread: InsertThread): Promise<Thread> {
    // Check if thread with this URL already exists
    const existingThreadId = this.urlIndex.get(insertThread.originalUrl);
    if (existingThreadId) {
      return this.threads.get(existingThreadId)!;
    }
    
    // Create new thread
    const id = this.currentId++;
    
    // Format the posts to ensure proper typing
    const formattedPosts: Tweet[] = [];
    
    if (Array.isArray(insertThread.posts)) {
      for (const post of insertThread.posts) {
        if (post && typeof post === 'object') {
          const images: TweetImage[] = [];
          
          // Process images if available
          if (Array.isArray(post.images)) {
            for (const img of post.images) {
              if (img && typeof img === 'object' && typeof img.url === 'string') {
                images.push({ url: img.url });
              }
            }
          }
          
          // Create a properly typed Tweet object
          formattedPosts.push({
            index: typeof post.index === 'number' ? post.index : 0,
            text: typeof post.text === 'string' ? post.text : '',
            time: typeof post.time === 'string' ? post.time : new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            }),
            images
          });
        }
      }
    }
    
    // Create a well-formed Thread object
    const thread: Thread = {
      id,
      author: insertThread.author,
      date: insertThread.date,
      posts: formattedPosts,
      originalUrl: insertThread.originalUrl
    };
    
    this.threads.set(id, thread);
    this.urlIndex.set(insertThread.originalUrl, id);
    return thread;
  }

  async getAllThreads(): Promise<Thread[]> {
    return Array.from(this.threads.values());
  }
}

export const storage = new MemStorage();
