import React from "react";
import { Thread } from "@shared/schema";

interface JsonPreviewProps {
  threadData: Thread;
  isVisible: boolean;
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ threadData, isVisible }) => {
  const formattedJson = JSON.stringify(threadData, null, 2);
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto font-mono text-sm">
      {formattedJson}
    </pre>
  );
};

export default JsonPreview;
