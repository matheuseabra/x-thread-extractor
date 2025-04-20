import DashboardLayout from "@/components/DashboardLayout";
import ThreadExtractor from "@/components/ThreadExtractor";
import React from "react";

const Thread: React.FC = () => {
  return (
    <DashboardLayout>
      <h2 className="text-xl font-bold text-white mb-2">
        Thread Extractor
      </h2>
      <p className="text-md text-gray-400 mb-4">
        Paste the URL of a X (Twitter) thread to extract its text and media attachments.
      </p>
      <ThreadExtractor />
    </DashboardLayout>
  );
};

export default Thread;
