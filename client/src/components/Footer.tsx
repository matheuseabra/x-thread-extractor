import React from "react";

const Footer: React.FC = () => (
  <footer className="border-t border-border py-8 bg-black text-gray-400 text-sm">
    <div className="max-w-3xl mx-auto pb-4 px-4 flex flex-col md:flex-row justify-between items-stretch gap-8">
      <div className="flex flex-col items-start justify-between">
        <div>
          <div className="flex items-center mb-3">
            <span className="text-white font-semibold text-lg">tools4x</span>
          </div>
          <span className="mt-2 text-xs text-gray-400">
            Useful tools for X (Twitter) users.
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-12 h-full">
        <ul className="space-y-2 min-w-[100px]">
          <h3>
            <span className="text-white font-semibold text-md">Tools</span>
          </h3>
          <li>
            <a href="/thread" className="hover:text-white transition">
              Thread Extractor
            </a>
          </li>
          <li>
            <a href="/video" className="hover:text-white transition">
              Video Downloader
            </a>
          </li>
          <li>
            More (Coming Soon)
          </li>
        </ul>
        <ul className="space-y-2 min-w-[100px]">
          <h3>
            <span className="text-white font-semibold text-md">Links</span>
          </h3>
          <li>
            <a href="/faq" className="hover:text-white transition">
              FAQ
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-white transition">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-white transition">
              Contact
            </a>
          </li>
        </ul>
        <ul className="space-y-2 min-w-[100px]">
          <h3>
            <span className="text-white font-semibold text-md">Follow Us</span>
          </h3>
          <li>
            <a
              href="https://x.com/tools4x"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              X
            </a>
          </li>
          <li>
            <a
              href="https://youtube.com/@tools4x"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              YouTube
            </a>
          </li>
          <li>
            <a
              href="https://gihtub.com/tools4x"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-3xl mx-auto px-4 mt-4 pt-4 border-t border-gray-400 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
      <span>© 2025 - tools4x</span>
      <div className="flex gap-4">
        <a href="/privacy" className="hover:text-white transition">
          Privacy
        </a>
        <a href="/terms" className="hover:text-white transition">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
