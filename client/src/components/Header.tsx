import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-border">
      <div className="max-w-3xl mx-auto w-full px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center cursor-pointer">
            <span className="text-lg font-bold text-white">tools4x.pro</span>
          </a>
        </div>
        <div className="flex items-center gap-8">
          <nav>
            <ul className="flex gap-6 text-gray-400 text-sm">
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
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
