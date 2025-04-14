import { Thread } from "@shared/schema";

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
