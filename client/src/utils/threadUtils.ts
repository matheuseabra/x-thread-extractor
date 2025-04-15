import { Thread, Tweet, TweetImage } from "@shared/schema";
import JSZip from "jszip";

/**
 * Generates a file name for the downloaded thread JSON
 */
export function generateThreadFileName(thread: Thread): string {
  const author = thread.author.replace('@', '');
  const date = new Date().toISOString().split('T')[0];
  return `${author}_thread_${date}.json`;
}

/**
 * Downloads the thread data as a JSON file
 */
export function downloadThreadAsJson(thread: Thread): void {
  // Create a blob with the JSON data
  const jsonString = JSON.stringify(thread, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = generateThreadFileName(thread);
  
  // Append to the document, click, and clean up
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

/**
 * Generates a file name for the downloaded thread Markdown
 */
export function generateMarkdownFileName(thread: Thread): string {
  const author = thread.author.replace('@', '');
  const date = new Date().toISOString().split('T')[0];
  return `${author}_thread_${date}.md`;
}

/**
 * Downloads the thread data as a Markdown file
 */
export function downloadThreadAsMarkdown(thread: Thread): void {
  // Format the thread as Markdown
  let markdownContent = `#\nThread by ${thread.author}\n\n`;
  thread.posts.forEach((tweet: Tweet, index: number) => {
    markdownContent += `## Tweet ${index + 1}\n\n`;
    markdownContent += `${tweet.text}\n\n`;
    if (tweet.images && tweet.images.length > 0) {
      markdownContent += `**Media:**\n`;
      tweet.images.forEach((image: TweetImage) => {
        // Assuming no alt text is available in the current schema, using a generic placeholder
        markdownContent += `- ![media](${image.url})\n`;
      });
      markdownContent += `\n`;
    }
    markdownContent += `---\n\n`;
  });

  // Create a blob with the Markdown data
  const blob = new Blob([markdownContent], { type: "text/markdown" });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a temporary link element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = generateMarkdownFileName(thread);

  // Append to the document, click, and clean up
  document.body.appendChild(a);
  a.click();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

/**
 * Downloads all thread images as a ZIP file
 */
export async function downloadThreadImagesAsZip(thread: Thread): Promise<void> {
  const zip = new JSZip();
  let imageCount = 0;

  // Collect all images from all posts
  thread.posts.forEach((tweet: Tweet, postIdx: number) => {
    if (tweet.images && tweet.images.length > 0) {
      tweet.images.forEach((image: TweetImage, imgIdx: number) => {
        // Name images as post-1-img-1.jpg, etc.
        const ext = image.url.split('.').pop()?.split('?')[0] || 'jpg';
        const filename = `post-${postIdx + 1}-img-${imgIdx + 1}.${ext}`;
        zip.file(filename, fetch(image.url).then(r => r.blob()));
        imageCount++;
      });
    }
  });

  if (imageCount === 0) {
    alert("No images found in this thread.");
    return;
  }

  // Generate the zip and trigger download
  const content = await zip.generateAsync({ type: "blob" });
  const author = thread.author.replace('@', '');
  const date = new Date().toISOString().split('T')[0];
  const zipName = `${author}_thread_images_${date}.zip`;
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

/**
 * Validates if a URL is a valid Twitter/X thread URL
 */
export function isValidTwitterUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return (
      (urlObj.hostname === "twitter.com" ||
        urlObj.hostname === "x.com" ||
        urlObj.hostname === "www.twitter.com" ||
        urlObj.hostname === "www.x.com") &&
      urlObj.pathname.includes("/status/")
    );
  } catch (e) {
    return false;
  }
}
