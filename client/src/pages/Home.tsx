import Layout from "@/components/Layout";
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
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center my-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Grow your X (Twitter) presence with Tools4x
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl">
            Extract, download, and save X (Twitter) threads as JSON or Markdown.
            The fastest and most reliable way to archive your favorite threads.
          </p>
          <Button
            asChild
            size="lg"
            className="flex w-48 items-center gap-2 text-lg bg-white text-black hover:bg-gray-100"
          >
            <a href="/signup">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>

        {/* Thread Extractor Features Section */}
        <section className="mt-32 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Thread Extractor
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Ever wanted to use a thread as another content? Tools4x makes it easy to extract
            and download threads from X (Twitter) in various formats.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black border border-border rounded-xl p-6 flex flex-col items-center">
              <FileText className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Thread Scraping
              </h4>
              <p className="text-gray-400">
                Scrape every tweet in a author's thread, including
                media attachments.
              </p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6 flex flex-col items-center">
              <FileJson className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Format Flexibility
              </h4>
              <p className="text-gray-400">
                Export threads as JSON, Markdown, or plain text for easy sharing
                and storage.
              </p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6 flex flex-col items-center">
              <Download className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                One-Click Download
              </h4>
              <p className="text-gray-400">
                Download all thread content instantly with a single click.
              </p>
            </div>
          </div>
        </section>

        {/* Video Extractor Features Section */}
        <section className="mt-32 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Video Downloader
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            The X algorithm favors video content. Download and save viral videos from X
            (Twitter) to boost your engagement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black border border-border rounded-xl p-6 flex flex-col items-center">
              <Video className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                High-Quality Downloads
              </h4>
              <p className="text-gray-400">
                Save videos in the best available resolution, including HD
                options.
              </p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6 flex flex-col items-center">
              <Layers className="text-white mb-3 h-8 w-8" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Multiple Formats
              </h4>
              <p className="text-gray-400">
                Choose from MP4, WebM, and more to suit your needs.
              </p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6 flex flex-col items-center">
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
        </section>

        {/* Pricing Section */}
        <section className="mt-32 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
            Pricing
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto text-center">
            Simple, transparent pricing for everyone. Choose the plan that fits
            your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-black border border-border rounded-xl p-8 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-white mb-2">Free</h3>
              <div className="text-3xl font-extrabold text-white mb-2">$0</div>
              <div className="text-gray-400 mb-4">Forever</div>
              <ul className="text-gray-300 text-sm mb-6 space-y-2">
                <li>✓ Extract threads (limited)</li>
                <li>✓ Download as JSON</li>
                <li>✓ Basic video downloads</li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <a href="/signup">Get Started</a>
              </Button>
            </div>
            {/* Plus Plan */}
            <div className="bg-zinc-900 border-2 border-white rounded-xl p-8 flex flex-col items-center text-center shadow-lg scale-105">
              <h3 className="text-xl font-bold text-white mb-2">Plus</h3>
              <div className="text-3xl font-extrabold text-white mb-2">$8</div>
              <div className="text-gray-400 mb-4">per month</div>
              <ul className="text-gray-300 text-sm mb-6 space-y-2">
                <li>✓ Unlimited thread extraction</li>
                <li>✓ Download as JSON & Markdown</li>
                <li>✓ High-quality video downloads</li>
                <li>✓ Priority support</li>
              </ul>
              <Button
                asChild
                className="w-full bg-white"
              >
                <a href="https://buy.polar.sh/polar_cl_2PcPmijYElXwzT23JPXbbyEQzZzelcjtctUY64g9IlP">Upgrade to Plus</a>
              </Button>
            </div>
            {/* Business Plan */}
            <div className="bg-black border border-border rounded-xl p-8 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
              <div className="text-3xl font-extrabold text-white mb-2">$29</div>
              <div className="text-gray-400 mb-4">per month</div>
              <ul className="text-gray-300 text-sm mb-6 space-y-2">
                <li>✓ All Pro features</li>
                <li>✓ Team access (up to 10 users)</li>
                <li>✓ Batch video & thread downloads</li>
                <li>✓ Dedicated support</li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <a href="/https://buy.polar.sh/polar_cl_QE3UQMuMbDKwnUo0s96pDJK7mwSnxkA1Uso0a4BjVtf">Upgrade to Pro</a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-32 w-full">
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
                  Yes! Our Free plan lets you extract threads and download basic
                  content at no cost. Upgrade for more features.
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
                  You can contact our support team anytime via the Contact page.
                  Pro and Business users get priority and dedicated support.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
