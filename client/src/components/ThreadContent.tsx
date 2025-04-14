import { Thread } from "@shared/schema";
import React, { useState } from "react";
import DownloadButton from "./DownloadButton";
import JsonPreview from "./JsonPreview";
import ThreadItem from "./ThreadItem";

interface ThreadContentProps {
  threadData: Thread;
}

const ThreadContent: React.FC<ThreadContentProps> = ({ threadData }) => {
  const [showJson, setShowJson] = useState(false);

  return (
    <div className="bg-black border border-border rounded-xl p-6">
      {/* Thread metadata and download button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            Thread by <span className="text-white">{threadData.author}</span>
          </h2>
          <p className="text-gray-400 text-sm">{threadData.date}</p>
        </div>
        
        <DownloadButton threadData={threadData} />
      </div>

      {/* Thread content */}
      <div className="space-y-4">
        {threadData.posts.map((post, index) => (
          <ThreadItem 
            key={index} 
            post={post} 
            authorProfilePicture={threadData.authorProfilePicture}
            authorName={threadData.author}
            authorUsername={threadData.authorUsername}
            isBlueVerified={threadData.isBlueVerified}
          />
        ))}
      </div>

      {/* JSON Preview */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-white">JSON Preview</h3>
          <button 
            onClick={() => setShowJson(!showJson)} 
            className="text-white hover:text-gray-300 text-sm font-medium"
          >
            {showJson ? "Hide JSON" : "Show JSON"}
          </button>
        </div>
        
        <JsonPreview threadData={threadData} isVisible={showJson} />
      </div>
    </div>
  );
};

export default ThreadContent;
