import React from "react";

const Footer: React.FC = () => (
  <footer className="border-t border-border py-8 bg-black text-gray-400 text-sm">
    <div className="max-w-3xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
      <div className="flex flex-col items-start">
        <div className="flex items-center mb-3">
          <span className="text-white font-semibold text-lg">tools4x</span>
        </div>
        <span className="mt-2 text-xs text-gray-400">
          Download content from X (Twitter) threads
        </span>
      </div>
      <div className="flex flex-row gap-12">
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
    <div className="max-w-3xl mx-auto px-4 mt-4 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
      <span>© 2025 - tools4x</span>
      <div className="flex gap-4">
        <a href="/privacy" className="hover:text-white transition">
          Privacy
        </a>
        <a href="/terms" className="hover:text-white transition">
          Terms of Service
        </a>
      </div>

      {/* <span className="mt-1 text-xs text-gray-500">
        Tools4X is not affiliated with X Corp.
      </span> */}
    </div>
  </footer>
);

export default Footer;
