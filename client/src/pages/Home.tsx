import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-12">
        <h1 className="text-3xl   md:text-4xl font-bold text-white mb-4">
          Download content from X with ease
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl">
          Extract, download, and save X (Twitter) threads as JSON or Markdown.
          The fastest and most reliable way to archive your favorite threads.
        </p>
        <Button
          asChild
          size="lg"
          className="flex items-center gap-2 text-lg bg-white text-black hover:bg-gray-100"
        >
          <a href="/thread">
            Start Extracting
            <ArrowRight className="h-5 w-5" />
          </a>
        </Button>

        {/* Thread Extractor Features Section */}
        <section className="mt-20 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Thread Extractor Features
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Effortlessly extract and archive entire X (Twitter) threads with
            advanced options.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                Full Thread Extraction
              </h4>
              <p className="text-gray-400">
                Capture every tweet in a thread, including replies, images, and
                media.
              </p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                Format Flexibility
              </h4>
              <p className="text-gray-400">
                Export threads as JSON, Markdown, or plain text for easy sharing
                and storage.
              </p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                One-Click Download
              </h4>
              <p className="text-gray-400">
                Download all thread content instantly with a single click.
              </p>
            </div>
          </div>
        </section>

        {/* Video Extractor Features Section */}
        <section className="mt-20 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Video Extractor Features
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Download videos from X (Twitter) posts in high quality and multiple
            formats.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                High-Quality Downloads
              </h4>
              <p className="text-gray-400">
                Save videos in the best available resolution, including HD
                options.
              </p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                Multiple Formats
              </h4>
              <p className="text-gray-400">
                Choose from MP4, WebM, and more to suit your needs.
              </p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                Batch Video Extraction
              </h4>
              <p className="text-gray-400">
                Extract and download multiple videos from a thread or user
                timeline at once.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
