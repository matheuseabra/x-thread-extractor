import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApiTweet } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import {
  ExternalLinkIcon,
  Heart,
  Loader2,
  MessageCircle,
  MoreVertical,
  Repeat2,
  User
} from "lucide-react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ViralFeed: React.FC = () => {
  const [tweets, setTweets] = useState<ApiTweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${window.location.origin}/api/tweets/viral`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch viral tweets");
        return res.json();
      })
      .then((data) => {
        setTweets(data.tweets);
        setHasNextPage(data.hasNextPage);
        setNextCursor(data.nextCursor || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const fetchMoreTweets = () => {
    if (!hasNextPage || !nextCursor) return;
    fetch(`${window.location.origin}/api/tweets/viral?cursor=${nextCursor}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch more tweets");
        return res.json();
      })
      .then((data) => {
        setTweets((prev) => [...prev, ...data.tweets]);
        setHasNextPage(data.hasNextPage);
        setNextCursor(data.nextCursor || null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex flex-1 min-h-[75vh] items-center justify-center">
          <Loader2 className="h-8 w-8 text-white mb-4 animate-spin" />
        </div>
      </DashboardLayout>
    );

  if (error)
    return (
      <div>
        <DashboardLayout>
          <div className="flex flex-1 min-h-[75vh]  items-center justify-center">
            <div className="text-center rounded-sm p-4 bg-red-300 font-semibold text-red-800">
              {error}
            </div>
          </div>
        </DashboardLayout>
      </div>
    );

  return (
    <DashboardLayout>
      <div className="mx-auto flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Viral Feed</h2>
          <p className="text-md text-gray-400 mb-4">
            Explore the most viral and engaging tweets right now.
          </p>
        </div>
        <InfiniteScroll
          dataLength={tweets.length}
          next={fetchMoreTweets}
          hasMore={hasNextPage}
          loader={
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
          }
          endMessage={
            <p className="text-center text-gray-400 py-4">
              No more viral tweets.
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {tweets.map((tweet) => (
              <a
                key={tweet.id}
                href={tweet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                style={{ textDecoration: "none" }}
              >
                <Card className="bg-zinc-900 border border-border rounded-xl p-5 flex flex-col relative transition cursor-pointer">
                  {/* Dropdown menu with MoreVertical icon */}
                  <div className="absolute top-4 right-4 z-10 text-gray-400">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="hover:text-white transition-colors focus:outline-none">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(tweet.url, "_blank");
                          }}
                        >
                          <span className="mr-2 text-gray-500">
                            <ExternalLinkIcon className="w-4 h-4" />
                          </span>
                          Open in new tab
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    {tweet.author.profilePicture ? (
                      <img
                        src={tweet.author.profilePicture}
                        alt="profile"
                        className="w-10 h-10 rounded-full border border-border"
                      />
                    ) : (
                      <User className="w-10 h-10 text-gray-600 border border-border rounded-full p-1" />
                    )}
                    <div className="flex items-center flex-row gap-2">
                      <div>
                        <p className="flex items-center font-semibold text-white">
                          {tweet.author.name}
                          {tweet.author.isBlueVerified && (
                            <span className="ml-1">
                              <svg
                                className="w-4 h-4 text-blue-500"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                              </svg>
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-1">
                          <p className="text-sm text-gray-400">
                            @{tweet.author.userName}
                          </p>
                          <small className="font-xs text-gray-400">
                            {formatDistanceToNow(tweet.createdAt)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-sm mb-4 line-clamp-5">
                    {tweet.text}
                  </div>
                  {tweet?.extendedEntities?.media?.[0]?.media_url_https && (
                    <img
                      src={tweet?.extendedEntities?.media?.[0]?.media_url_https}
                      alt="tweet media"
                      className="rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2 gap-2">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-gray-400" />
                      {tweet.likeCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Repeat2 className="w-4 h-4 text-gray-400" />
                      {tweet.retweetCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      {tweet.replyCount}
                    </span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </DashboardLayout>
  );
};

export default ViralFeed;
