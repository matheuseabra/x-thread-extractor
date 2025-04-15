import Layout from "@/components/Layout";
import React from "react";

const faqs = [
  {
    question: "What is ThreadTracker?",
    answer:
      "ThreadTracker is a tool that helps you extract, preview, and download Twitter threads in a structured format."
  },
  {
    question: "How do I use ThreadTracker?",
    answer:
      "Paste the URL of a Twitter thread into the input box on the homepage, and ThreadTracker will extract the thread content for you."
  },
  {
    question: "What formats can I download threads in?",
    answer:
      "Currently, you can download threads as JSON files. More formats may be supported in the future."
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No, ThreadTracker does not store your data. All processing happens in real-time and is not saved."
  },
  {
    question: "Does ThreadTracker work with private or protected threads?",
    answer:
      "No, ThreadTracker can only extract public threads that are accessible without logging in."
  },
  {
    question: "Who can I contact for support?",
    answer:
      "You can reach out via the contact information provided in the About page."
  }
];

const FAQ: React.FC = () => (
  <Layout>
    <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>
    <div className="space-y-6">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border rounded-lg p-4">
          <h2 className="text-md font-semibold">{faq.question}</h2>
          <p className="mt-2 text-gray-400">{faq.answer}</p>
        </div>
      ))}
    </div>
  </Layout>
);

export default FAQ;
