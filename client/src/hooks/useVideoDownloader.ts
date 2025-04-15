import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface VideoDownloadParams {
  url: string;
  type: string;
}

export const useVideoDownloader = () => {
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ url, type }: VideoDownloadParams) => {
      const response = await apiRequest("POST", "/api/download", { url, type });
      const data = await response.json();
      return data.filename as string;
    },
    onSuccess: (filename) => {
      setFilename(filename);
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
      setFilename(null);
    },
  });

  const downloadVideo = async (url: string, type: string = ".mp4") => {
    setError(null);
    return mutation.mutateAsync({ url, type });
  };

  return {
    downloadVideo,
    filename,
    isLoading: mutation.isPending,
    error,
  };
}