import ThreadExtractor from "@/components/ThreadExtractor";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
            Thread Extractor
          </h1>
          <div className="text-gray-400 text-sm">Extract and download threads</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ThreadExtractor />
      </main>

      <footer className="border-t border-gray-800 mt-12 py-6 text-center text-gray-400 text-sm">
        <div className="max-w-3xl mx-auto px-4">
          <p>X Thread Extractor - Extract and download X threads</p>
          <p className="mt-1">This tool is not affiliated with X Corp.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
