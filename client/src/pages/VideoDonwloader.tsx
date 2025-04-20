import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useVideoDownloader } from "@/hooks/useVideoDownloader";
import { useState } from "react";

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const { downloadVideo, isLoading, error, filename } = useVideoDownloader();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    const filename = await downloadVideo(url, ".mp4");
    if (filename) {
      const response = await fetch(`https://api.x-downloader.com/${filename}`);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Video Downloader</h2>
        <p className="text-md text-gray-400 mb-4">
          Paste the URL of a X (Twitter) post to download a video.
        </p>
        <div className="bg-zinc-900 border border-border rounded-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p className="text-md font-semibold mb-4 text-white">Enter URL:</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                placeholder="https://x.com/username/status/123456789"
                required
                className="w-full px-4 py-2 bg-black border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" className="sm:w-auto font-semibold">
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Downloading...
                  </div>
                ) : (
                  "Download"
                )}
              </Button>
            </div>
            {error && (
              <div className="mt-1 text-sm text-red-400">{error}</div>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VideoDownloader;
