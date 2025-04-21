import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => (
  <section className="mt-32 mb-16 w-full flex justify-center">
    <div className="w-full max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
        FAQ
      </h2>
      <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto text-center">
        Frequently asked questions
      </p>
      <div className="max-w-2xl mx-auto text-left">
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
              What is Tools4x?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Tools4x is a platform that helps you extract, download, and save
              content from X (Twitter), including threads and videos, in various
              formats.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
              Is there a free plan?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes! Our Free plan lets you extract threads and download basic
              content at no cost. Upgrade for more features.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
              What formats can I download threads in?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              You can export threads as JSON, Markdown, or plain text for easy
              sharing and storage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
              Can I download videos from X?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes, Tools4x allows you to download videos from X posts in high
              quality and multiple formats, including MP4.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q5">
            <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
              How do I get support?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              You can contact our support team anytime via the Contact page. Pro
              and Business users get priority and dedicated support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQ;
