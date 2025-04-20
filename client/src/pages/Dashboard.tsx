import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Flame, MessageSquare, Video } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="mx-auto flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            Welcome, {user?.email || "User"} 👋
          </h2>
          <p className="text-md text-gray-400 mb-4">
            Tools4x helps you extract, download, and save content from X
            (Twitter) with ease. Here’s what you can do:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-border rounded-lg p-6 flex flex-col items-center text-center shadow">
            <span className="bg-zinc-800 p-3 rounded-full mb-3">
              <Flame className="w-7 h-7 text-white" />
            </span>
            <h2 className="text-lg font-semibold text-white mb-1">
              Discover Viral Tweets
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Explore trending and viral tweets to stay updated and inspired.
            </p>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/viral-feed")}
            >
              See Viral Feed →
            </Button>
          </div>
          <div className="bg-zinc-900 border border-border rounded-lg p-6 flex flex-col items-center text-center shadow">
            <span className="bg-zinc-800 p-3 rounded-full mb-3">
              <MessageSquare className="w-7 h-7 text-white" />
            </span>
            <h2 className="text-lg font-semibold text-white mb-1">
              Extract Threads
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Paste a thread URL and get the full conversation in a clean,
              readable format.
            </p>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/thread")}
            >
              Try Thread Extractor →
            </Button>
          </div>
          <div className="bg-zinc-900 border border-border rounded-lg p-6 flex flex-col items-center text-center shadow">
            <span className="bg-zinc-800 p-3 rounded-full mb-3">
              <Video className="w-7 h-7 text-white" />
            </span>
            <h2 className="text-lg font-semibold text-white mb-1">
              Download Videos
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Save videos from X posts directly to your device in just a few
              clicks.
            </p>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/video")}
            >
              Try Video Downloader →
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
