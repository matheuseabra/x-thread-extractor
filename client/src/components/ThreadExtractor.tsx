import { useToast } from "@/hooks/use-toast";
import useThreadExtractor from "@/hooks/useThreadExtractor";
import React, { useEffect, useState } from "react";
import HowItWorks from "./HowItWorks";
import ThreadContent from "./ThreadContent";
import URLInput from "./URLInput";

const ThreadExtractor: React.FC = () => {
  const {
    threadUrl,
    setThreadUrl,
    threadData,
    isLoading,
    error,
    extractThread,
  } = useThreadExtractor();

  const { toast } = useToast();
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    setApiError(null);
  }, [threadUrl]);

  const handleSubmit = async (url: string) => {
    try {
      setApiError(null);
      await extractThread(url);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setApiError(errorMessage);

      toast({
        variant: "destructive",
        title: "Extraction failed",
        description: errorMessage,
      });
    }
  };

  const isTwitterApiError =
    error &&
    (error.includes("Twitter API") ||
      error.includes("tweet") ||
      error.includes("API authentication") ||
      error.includes("Rate limit"));

  return (
    <>
      <h2 className="text-xl font-bold text-white mb-2">
        X (Twitter) Thread Downloader
      </h2>
      <p className="text-md text-gray-400 mb-4">
        Paste the URL of a thread to extract its content.
      </p>
      <URLInput
        onSubmit={handleSubmit}
        isLoading={isLoading}
        threadUrl={threadUrl}
        setThreadUrl={setThreadUrl}
        apiError={apiError}
      />

      {!threadData && !isLoading && !error && <HowItWorks />}

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-gray-400">Extracting thread content...</p>
          <p className="mt-2 text-sm text-gray-500">Connecting to X API...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-lg mb-6">
          <div className="flex flex-col">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{error}</span>
            </div>

            {isTwitterApiError && (
              <div className="mt-3 text-sm pl-7">
                <p>Possible solutions:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Try a different X thread URL</li>
                  <li>Check if the thread is from a public account</li>
                  <li>Wait a few minutes and try again if rate limited</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {threadData && !isLoading && !error && (
        <ThreadContent threadData={threadData} />
      )}
    </>
  );
};

export default ThreadExtractor;
