import Layout from "@/components/Layout";
import Pricing from "@/components/Pricing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  FileJson,
  FileText,
  Layers,
  ListVideo,
  Video,
} from "lucide-react";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center text-center w-full">
        <div className="w-full flex justify-center bg-hero fading min-h-[100vh] pb-24">
          <div className="max-w-5xl flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
            <h1 className="tracking-normal text-3xl md:text-5xl font-bold text-white mb-6">
              The missing blueprint to grow your X
            </h1>
            <p className="text-md md:text-lg text-gray-400 mb-6 max-w-2xl">
              A powerful suite of tools to find viral tweets, extract threads,
              and download videos from X (Twitter). Save time and boost your
              engagement with our easy-to-use platform.
            </p>
            <Button
              asChild
              size="lg"
              className="flex w-48 items-center gap-2 text-lg bg-white text-black font-semibold"
            >
              <a href="/signup">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <section className="my-24 w-full flex justify-center">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Viral Tweet Feed
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Discover the most viral and trending tweets in real time. Stay
              inspired and up-to-date with what’s making waves on X (Twitter).
            </p>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center w-full md:w-1/3">
                <ArrowRight className="text-white mb-3 h-8 w-8" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  Explore Viral Tweets
                </h4>
                <p className="text-gray-400 mb-4 text-center">
                  Instantly browse a curated feed of the most engaging and viral
                  tweets right now.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-24 w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Thread Extractor
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Ever wanted to use a thread as another content? Tools4x makes it
              easy to extract and download threads from X (Twitter) in various
              formats.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
                <FileText className="text-white mb-3 h-8 w-8" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  Thread Scraping
                </h4>
                <p className="text-gray-400">
                  Scrape every tweet in a author's thread, including media
                  attachments.
                </p>
              </div>
              <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
                <FileJson className="text-white mb-3 h-8 w-8" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  Format Flexibility
                </h4>
                <p className="text-gray-400">
                  Export threads as JSON, Markdown, or plain text for easy
                  sharing and storage.
                </p>
              </div>
              <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
                <Download className="text-white mb-3 h-8 w-8" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  One-Click Download
                </h4>
                <p className="text-gray-400">
                  Download all thread content instantly with a single click.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-24 w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Video Downloader
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              The X algorithm favors video content. Download and save viral
              videos from X (Twitter) to boost your engagement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
                <Video className="text-white mb-3 h-8 w-8" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  High-Quality Downloads
                </h4>
                <p className="text-gray-400">
                  Save videos in the best available resolution, including HD
                  options.
                </p>
              </div>
              <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
                <Layers className="text-white mb-3 h-8 w-8" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  Multiple Formats
                </h4>
                <p className="text-gray-400">
                  Choose from MP4, WebM, and more to suit your needs.
                </p>
              </div>
              <div className="bg-zinc-900 border border-border rounded-xl p-6 flex flex-col items-center">
                <ListVideo className="text-white mb-3 h-8 w-8" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  Batch Video Extraction
                </h4>
                <p className="text-gray-400">
                  Extract and download multiple videos from a thread or user
                  timeline at once.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Pricing />

        <section className="my-32 w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
              FAQ
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto text-center">
              Frequently asked questions about Tools4x.
            </p>
            <div className="max-w-2xl mx-auto text-left">
              <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="q1">
                  <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
                    What is Tools4x?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Tools4x is a platform that helps you extract, download, and
                    save content from X (Twitter), including threads and videos,
                    in various formats.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
                    Is there a free plan?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Yes! Our Free plan lets you extract threads and download
                    basic content at no cost. Upgrade for more features.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
                    What formats can I download threads in?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    You can export threads as JSON, Markdown, or plain text for
                    easy sharing and storage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4">
                  <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
                    Can I download videos from X?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Yes, Tools4x allows you to download videos from X posts in
                    high quality and multiple formats, including MP4.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q5">
                  <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
                    How do I get support?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    You can contact our support team anytime via the Contact
                    page. Pro and Business users get priority and dedicated
                    support.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
