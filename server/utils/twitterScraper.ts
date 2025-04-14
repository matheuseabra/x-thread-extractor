import { Thread, Tweet, TweetImage } from "@shared/schema";

/**
 * This module handles the fetching of Twitter/X threads using the TwitterAPI.io service.
 * It uses the native fetch API to get authentic data from Twitter/X.
 */

// Define the Twitter API response structure based on provided documentation
// Base structure for a single tweet object from the API
type ApiTweet = {
  type: string;
  id: string;
  url: string;
  text: string;
  createdAt: string;
  author: {
    userName: string;
    name: string;
    profilePicture?: string;
  };
  entities?: {
    urls?: {
      display_url: string;
      expanded_url: string;
      url: string;
    }[];
    media?: {
      type: string;
      media_url_https: string;
    }[];
  };
  extendedEntities?: {
    media?: {
      type: string;
      media_url_https: string;
    }[];
  };
  likeCount?: number;
  retweetCount?: number;
  replyCount?: number;
  quoteCount?: number;
  viewCount?: number;
  conversationId?: string; // Needed to identify thread context
};

// Response structure for fetching specific tweets
interface TwitterApiTweetsResponse {
  tweets: ApiTweet[];
  status: string;
  message: string;
  has_next_page?: true;
  cursor?: string;
}

// Response structure for fetching replies (now using advanced_search)
interface TwitterApiRepliesResponse {
  tweets: ApiTweet[]; // Changed from replies to tweets
  has_next_page?: boolean; // Added pagination field
  next_cursor?: string; // Added pagination field
}

// Get API key from environment variables
const API_KEY = "af67c3283d474406ad029d9b38b1eba3";

// Validate API key
if (!API_KEY) {
  console.error(
    "TwitterAPI.io API key is missing. Please set the TWITTER_API_KEY environment variable."
  );
}

export async function scrapeTwitterThread(url: string): Promise<Thread> {
  // Validate API key
  if (!API_KEY) {
    throw new Error(
      "Twitter API key is missing. Please add TWITTER_API_KEY to your environment variables."
    );
  }

  const initialTweetId = extractTweetId(url);

  if (!initialTweetId) {
    throw new Error(
      "Could not extract tweet ID from URL. Please ensure you're using a valid Twitter/X thread URL."
    );
  }

  try {
    // 1. Fetch the initial tweet
    const initialTweetData = await fetchTweetById(initialTweetId);

    if (!initialTweetData || initialTweetData.tweets.length === 0) {
      throw new Error(
        "Failed to fetch the initial tweet. It might be private, deleted, or the API returned an unexpected format."
      );
    }
    const initialTweet = initialTweetData.tweets[0];
    const authorUsername = initialTweet.author.userName;

    // 2. Fetch replies
    const repliesData = await fetchReplies(initialTweetId, authorUsername);
    
    // 3. Sort replies by creation time
    const sortedReplies = repliesData.tweets.sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // 4. Combine initial tweet and replies
    const allTweets = [initialTweet, ...sortedReplies];

    // 5. Format tweets into Thread posts
    const posts = allTweets.map((tweet, index) => ({
      index: index + 1,
      text: tweet.text,
      time: new Date(tweet.createdAt).toLocaleTimeString(),
      images: tweet.extendedEntities?.media
        ?.filter(m => m.type === "photo")
        .map(m => ({ url: m.media_url_https })) || []
    }));

    // 6. Create and return Thread structure
    const thread: Thread = {
      author: `@${authorUsername}`,
      authorProfilePicture: initialTweet.author.profilePicture,
      date: new Date(initialTweet.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      posts,
      originalUrl: url
    };

    return thread;

  } catch (error) {
    console.error("Error fetching Twitter thread:", error);

    if (error instanceof Error) {
      // Provide more specific error messages
      if (error.message.includes("Tweet not found")) {
        throw new Error(
          "Could not find the tweet. It might be private or deleted."
        );
      } else if (error.message.includes("authentication failed")) {
        throw new Error(
          "Twitter API authentication failed. Please check your API key."
        );
      } else if (error.message.includes("rate limit exceeded")) {
        throw new Error(
          "Twitter API rate limit exceeded. Please try again later."
        );
      }
      throw error;
    }

    throw new Error(
      "Failed to extract thread content. An unexpected error occurred."
    );
  }
}

/**
 * Fetches a specific tweet by its ID using native fetch API
 */
async function fetchTweetById(
  tweetId: string
): Promise<TwitterApiTweetsResponse> {
  const url = new URL("https://api.twitterapi.io/twitter/tweets");
  url.searchParams.append("tweet_ids", tweetId);

  const options = {
    method: "GET",
    headers: {
      "X-API-Key": API_KEY || "",
      Accept: "application/json",
    },
  };

  try {
    const response = await fetch(url.toString(), options);
    await handleApiResponseErrors(response, "fetchTweetById");

    // Check content type BEFORE parsing JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `Expected JSON response but received Content-Type: ${
          contentType || "none"
        } in fetchTweetById`
      );
    }

    const data = await response.json();

    if (
      !data ||
      !data.tweets ||
      !Array.isArray(data.tweets) ||
      data.tweets.length === 0
    ) {
      // This case might indicate a valid JSON response but with unexpected structure/empty data
      throw new Error(
        "Twitter API returned valid JSON but with missing or empty tweets data."
      );
    }

    return data as TwitterApiTweetsResponse;
  } catch (error) {
    console.error(`Error in fetchTweetById for ID ${tweetId}:`, error);
    // Re-throw the original error or a wrapped one if needed
    throw error;
  }
}

/**
 * Fetches replies to a tweet using native fetch API
 */
async function fetchReplies(
  tweetId: string,
  username: string
): Promise<TwitterApiRepliesResponse> {
  const url = new URL(
    "https://api.twitterapi.io/twitter/tweet/advanced_search"
  );
  const queryString = `$conversation_id:${tweetId} from:${username}`;
  url.searchParams.append("query", queryString);

  const options = {
    method: "GET",
    headers: {
      "X-API-Key": API_KEY || "",
      Accept: "application/json",
    },
  };

  try {
    const response = await fetch(url.toString(), options);
    await handleApiResponseErrors(response, "fetchReplies"); // Checks for !response.ok

    // Check content type AFTER checking response.ok
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `Expected JSON response but received Content-Type: ${
          contentType || "none"
        } in fetchReplies`
      );
    }

    const data = await response.json();

    // Check for valid structure (presence of tweets array)
    if (!data || !Array.isArray(data.tweets)) {
      throw new Error(
        "Twitter API returned valid JSON but with unexpected structure (missing tweets array) for replies search."
      );
    }

    // Log if tweets array is empty
    if (data.tweets.length === 0) {
      console.log(
        `No replies found for tweet ID: ${tweetId} from ${username} via advanced search (valid JSON response)`
      );
    }

    // TODO: Implement pagination using data.has_next_page and data.next_cursor if needed

    return data as TwitterApiRepliesResponse;
  } catch (error) {
    console.error(
      `Error in fetchReplies (advanced search) for tweet ID ${tweetId} / user ${username}:`,
      error
    );
    // If a specific error indicates the conversation/user wasn't found vs. a general failure,
    // we might return an empty response instead of throwing.
    // For now, re-throwing allows the main function to catch it.
    throw error;
  }
}

/**
 * Handles common API response errors
 */
async function handleApiResponseErrors(
  response: Response,
  functionName: string
) {
  if (!response.ok) {
    let errorMessage = `Twitter API error in ${functionName}: ${response.status} ${response.statusText}`;
    let errorBodyText = await response.text(); // Read body as text first
    try {
      // Try to parse as JSON, might fail if it's HTML
      const errorBody = JSON.parse(errorBodyText);
      errorMessage += ` - ${errorBody.message || JSON.stringify(errorBody)}`;
    } catch (e) {
      // If JSON parsing fails, append the raw text (truncated)
      errorMessage += ` - Response body: ${errorBodyText.substring(0, 200)}${
        errorBodyText.length > 200 ? "..." : ""
      }`;
    }

    if (response.status === 401) {
      throw new Error(
        `Twitter API authentication failed in ${functionName}. Check API key. Details: ${errorMessage}`
      );
    } else if (response.status === 404) {
      throw new Error(
        `Resource not found (404) in ${functionName}. Tweet/User might be private/deleted or endpoint invalid. Details: ${errorMessage}`
      );
    } else if (response.status === 429) {
      throw new Error(
        `Twitter API rate limit exceeded in ${functionName}. Try again later. Details: ${errorMessage}`
      );
    } else {
      // Include the detailed message for other errors
      throw new Error(errorMessage);
    }
  }
}

/**
 * Formats a raw tweet from the API (ApiTweet) into our simplified application's format (Tweet)
 */
function formatTweet(apiTweetData: ApiTweet, index: number): Tweet {
  const images: TweetImage[] = [];
  
  // Extract images from extendedEntities primarily
  if (apiTweetData.extendedEntities?.media) {
    apiTweetData.extendedEntities.media.forEach(media => {
      if (media.type === 'photo' && media.media_url_https) {
        images.push({ url: media.media_url_https });
      }
    });
  } 
  // Fallback: Check entities.media if extendedEntities is missing/empty
  else if (apiTweetData.entities?.media) {
     apiTweetData.entities.media.forEach(media => {
      if (media.type === 'photo' && media.media_url_https) {
        images.push({ url: media.media_url_https });
      }
    });
  }

  // Format the time string
  const timeString = new Date(apiTweetData.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Return the simplified Tweet structure
  return {
    index, // The sequential index within the processed thread
    text: apiTweetData.text || '',
    time: timeString,
    images // Array of { url: string }
  };
}

/**
 * Extracts a tweet ID from a Twitter/X URL
 */
function extractTweetId(url: string): string | null {
  // Updated regex to handle URLs with query parameters like ?s=20
  const match = url.match(/\/status(?:es)?\/(\d+)/);
  return match ? match[1] : null;
}
