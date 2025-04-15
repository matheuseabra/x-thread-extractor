import { downloadThreadAsJson, downloadThreadAsMarkdown, downloadThreadImagesAsZip } from "@/utils/threadUtils";
import { Thread } from "@shared/schema";
import { DownloadIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

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

  const handleImagesDownload = async () => {
    await downloadThreadImagesAsZip(threadData);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-start sm:justify-start w-full">
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
      <Button
        onClick={handleImagesDownload}
        variant="outline"
        className="flex items-center gap-2"
      >
        <DownloadIcon className="h-4 w-4" />
        Download Images
      </Button>
    </div>
  );
};

export default DownloadButton;
