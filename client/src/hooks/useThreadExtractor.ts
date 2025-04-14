import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Thread } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function useThreadExtractor() {
  const [threadUrl, setThreadUrl] = useState("");
  const [threadData, setThreadData] = useState<Thread | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/extract", { url });
      const data = await response.json();
      return data as Thread;
    },
    onSuccess: (data) => {
      setThreadData(data);
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
      setThreadData(null);
    },
  });

  const extractThread = async (url: string) => {
    setThreadUrl(url);
    setError(null);
    return mutation.mutateAsync(url);
  };

  return {
    threadUrl,
    setThreadUrl,
    threadData,
    isLoading: mutation.isPending,
    error,
    extractThread,
  };
}
