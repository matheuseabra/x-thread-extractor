import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<null | any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstall(false);
      setDeferredPrompt(null);
    }
  };

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
          {showInstall && (
            <Button variant="outline" onClick={handleInstallClick} className="ml-4">
              Get App
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
