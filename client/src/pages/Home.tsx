import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Download content from X with ease
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl">
          Extract, download, and save X (Twitter) threads as JSON or Markdown. The fastest and most reliable way to archive your favorite threads.
        </p>
        
        <Button 
          asChild
          size="lg"
          className="flex items-center gap-2 text-lg"
        >
          <a href="/thread">
            Start Extracting
            <ArrowRight className="h-5 w-5" />
          </a>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-black border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Easy to Use</h3>
            <p className="text-gray-400">Just paste the thread URL and get your content instantly. No login required.</p>
          </div>
          <div className="bg-black border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Multiple Formats</h3>
            <p className="text-gray-400">Download threads as JSON, Markdown, or save all images as a ZIP file.</p>
          </div>
          <div className="bg-black border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">Your data is never stored. All processing happens in real-time.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
