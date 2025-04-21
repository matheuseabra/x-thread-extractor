import {
    ArrowRight,
    Download,
    FileJson,
    FileText,
    Layers,
    ListVideo,
    Video,
} from "lucide-react";

const Features = () => {
  return (
    <>
      <section className="my-24 w-full flex justify-center">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Viral Tweet Feed
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Discover the most viral and trending tweets in real time. Stay
            inspired and up-to-date with what’s making waves on X (Twitter).
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center w-full md:w-1/3">
              <ArrowRight className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Explore Viral Tweets
              </h4>
              <p className="text-gray-400 mb-4 text-center">
                Instantly browse a curated feed of the most engaging and viral
                tweets right now.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-24 w-full flex justify-center">
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Thread Extractor
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Ever wanted to use a thread as another content? Tools4x makes it
            easy to extract and download threads from X (Twitter) in various
            formats.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
              <FileText className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Thread Scraping
              </h4>
              <p className="text-gray-400">
                Scrape every tweet in a author's thread, including media
                attachments.
              </p>
            </div>
            <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
              <FileJson className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Format Flexibility
              </h4>
              <p className="text-gray-400">
                Export threads as JSON, Markdown, or plain text for easy sharing
                and storage.
              </p>
            </div>
            <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
              <Download className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                One-Click Download
              </h4>
              <p className="text-gray-400">
                Download all thread content instantly with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-24 w-full flex justify-center">
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Video Downloader
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            The X algorithm favors video content. Download and save viral videos
            from X (Twitter) to boost your engagement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
              <Video className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                High-Quality Downloads
              </h4>
              <p className="text-gray-400">
                Save videos in the best available resolution, including HD
                options.
              </p>
            </div>
            <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
              <Layers className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Multiple Formats
              </h4>
              <p className="text-gray-400">
                Choose from MP4, WebM, and more to suit your needs.
              </p>
            </div>
            <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
              <ListVideo className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Batch Video Extraction
              </h4>
              <p className="text-gray-400">
                Extract and download multiple videos from a thread or user
                timeline at once.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
