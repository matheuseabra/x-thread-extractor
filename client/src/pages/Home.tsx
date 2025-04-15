import ThreadExtractor from "@/components/ThreadExtractor";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <header className="bg-black border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white flex items-center">
            <img src="/assets/tools4x-logo.png" height="48" width="48" alt="tools4x logo" />
            Thread Downloader
          </h1>
          <div className="text-gray-400 text-sm">Download content from X (Twitter) threads</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ThreadExtractor />
      </main>

      <footer className="border-t border-border mt-12 py-6 text-center text-gray-400 text-sm">
        <div className="max-w-3xl mx-auto px-4">
          <p>X (Twitter) Thread Downloader</p>
          <p className="mt-1">Tools4X is not affiliated with X Corp.</p>
        </div >
      </footer>
    </div>
  );
};

export default Home;
