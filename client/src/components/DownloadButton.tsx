import { downloadThreadAsJson, downloadThreadAsMarkdown } from "@/utils/threadUtils";
import { Thread } from "@shared/schema";
import { DownloadIcon } from "lucide-react"; // Using lucide-react for icons
import React from "react";
import { Button } from "./ui/button"; // Assuming Button component exists

interface DownloadButtonProps {
  threadData: Thread;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ threadData }) => {
  const handleJsonDownload = () => {
    downloadThreadAsJson(threadData);
  };

  const handleMarkdownDownload = () => {
    downloadThreadAsMarkdown(threadData);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleJsonDownload}
        variant="outline" // Use outline variant for consistency or choose another
        className="flex items-center gap-2"
      >
        <DownloadIcon className="h-4 w-4" />
        Download JSON
      </Button>
      <Button
        onClick={handleMarkdownDownload}
        variant="outline" // Use outline variant
        className="flex items-center gap-2"
      >
        <DownloadIcon className="h-4 w-4" />
        Download Markdown
      </Button>
    </div>
  );
};

export default DownloadButton;
