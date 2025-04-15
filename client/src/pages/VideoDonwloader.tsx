import Layout from "@/components/Layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVideoDownloader } from "@/hooks/useVideoDownloader";
import { DownloadIcon } from "lucide-react";
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
    <Layout>
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Video Downloader</h2>
        <p className="text-md text-gray-400 mb-4">
          Paste the URL of a X (Twitter) post to download a video.
        </p>
        <div className="bg-black border border-border rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-md font-semibold mb-4 text-white">Enter URL:</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                className="w-full px-4 py-2 bg-black border border-border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="https://x.com/username/status/123456789"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Button type="submit" className="w-full sm:w-auto font-semibold">
                <DownloadIcon className="h-4 w-4" />
                {isLoading ? "Downloading..." : "Download"}
              </Button>
            </div>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="mt-6 border border-border p-6 rounded-xl">
        <h3 className="text-md font-bold text-white mb-2">How it works:</h3>
        <ol className="list-decimal list-inside text-gray-400 space-y-1">
          <li>
            Copy the URL of any public X (Twitter) post containing a video
          </li>
          <li>Paste the URL in the input box above</li>
          <li>Click the download button to save the video</li>
          <li>No login required. Your data is never stored.</li>
        </ol>
      </div>
    </Layout>
  );
};

export default VideoDownloader;
