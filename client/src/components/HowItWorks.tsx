import React from "react";

const HowItWorks: React.FC = () => (
  <section className="my-6 border border-border rounded-xl p-6">
    <h2 className="text-md font-bold text-white mb-2">How it works:</h2>
    <ol className="list-decimal list-inside text-gray-400 space-y-1">
      <li>
        Paste the URL of a public X (Twitter) thread in the input box below.
      </li>
      <li>Click the extract button to fetch the thread content.</li>
      <li>Preview the thread and download it as JSON, Markdown, or images as a .zip file.</li>
      <li>No login required. Your data is never stored.</li>
    </ol>
  </section>
);

export default HowItWorks;
