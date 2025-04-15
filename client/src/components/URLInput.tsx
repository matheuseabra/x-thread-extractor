import { twitterUrlSchema } from "@shared/schema";
import React, { useState } from "react";
import { ZodError } from "zod";
import { Button } from "./ui/button";

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  threadUrl: string;
  setThreadUrl: (url: string) => void;
  apiError?: string | null;
}

// Example Twitter/X thread URLs
const EXAMPLE_URLS = [
  "https://twitter.com/elonmusk/status/1516593781357088773",
  "https://x.com/naval/status/1002103360646823936",
  "https://twitter.com/paulg/status/1571304186314371075",
];

const URLInput: React.FC<URLInputProps> = ({
  onSubmit,
  isLoading,
  threadUrl,
  setThreadUrl,
  apiError: propApiError,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [localApiError, setLocalApiError] = useState<string | null>(null);

  // Use the API error from props or the local state
  const apiError = propApiError || localApiError;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalApiError(null);

    try {
      // Validate URL format
      twitterUrlSchema.parse(threadUrl);
      setValidationError(null);
      onSubmit(threadUrl);
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.errors[0].message);
      } else {
        setValidationError("Invalid URL format");
      }
    }
  };

  // Set an example URL when user clicks it
  const useExampleUrl = (url: string) => {
    setThreadUrl(url);
    setValidationError(null);
    setLocalApiError(null);
  };

  return (
    <div className="bg-black border border-border rounded-xl p-6 mb-6">
      <p className="text-md font-semibold mb-4 text-white">Enter URL:</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex flex-grow flex-col sm:flex-row gap-4">
            <input
              type="url"
              placeholder="https://x.com/username/status/123456789"
              required
              className="w-full px-4 py-2 bg-black border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              value={threadUrl}
              onChange={(e) => {
                setThreadUrl(e.target.value);
                setValidationError(null);
              }}
              disabled={isLoading}
            />
            {validationError && (
              <div className="mt-1 text-sm text-red-400">{validationError}</div>
            )}
            {apiError && (
              <div className="mt-1 text-sm text-red-400">{apiError}</div>
            )}
          </div>
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
                Extracting...
              </div>
            ) : (
              "Extract"
            )}
          </Button>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-400 mb-2">
            Try these example threads:
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_URLS.map((url, index) => (
              <button
                key={index}
                type="button"
                onClick={() => useExampleUrl(url)}
                className="text-xs px-2 py-1 border border-border rounded text-gray-300 transition-colors"
                disabled={isLoading}
              >
                Example {index + 1}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default URLInput;
