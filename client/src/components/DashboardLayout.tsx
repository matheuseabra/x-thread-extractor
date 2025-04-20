import { Flame, LayoutDashboardIcon, MessageSquare, Video } from "lucide-react";
import React from "react";
import { useLocation } from "wouter";
import DashboardHeader from "./DashboardHeader";

const Sidebar = () => {
  const [location] = useLocation();
  return (
    <aside className="bg-black w-64 min-h-screen flex items- flex-col border-r">
      <div className="flex items-center gap-2 px-8 py-6 mb-4">
        <img src="/assets/tools4x-logo.png" width={20} height={20} alt="logo" />
        <span className="text-white font-semibold text-base">tools4x.pro</span>
      </div>
      <nav className="flex flex-col gap-3 px-4">
        <a
          href="/dashboard"
          className={`flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-zinc-800 ${location === "/dashboard" ? "bg-zinc-800 text-white font-semibold" : "text-white"}`}
        >
          <LayoutDashboardIcon className="w-4 h-4" />
          Dashboard
        </a>
        <a
          href="/viral-feed"
          className={`flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-zinc-800 ${location === "/viral-feed" ? "bg-zinc-800 text-white font-semibold" : "text-white"}`}
        >
          <Flame className="w-4 h-4" />
          Viral Feed
        </a>
        <a
          href="/thread"
          className={`flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-zinc-800 ${location === "/thread" ? "bg-zinc-800 text-white font-semibold" : "text-white"}`}
        >
          <MessageSquare className="w-4 h-4" />
          Thread Extractor
        </a>
        <a
          href="/video"
          className={`flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-zinc-800 ${location === "/video" ? "bg-zinc-800 text-white font-semibold" : "text-white"}`}
        >
          <Video className="w-4 h-4" />
          Video Downloader
        </a>
      </nav>
    </aside>
  );
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="bg-black min-h-screen flex flex-row">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <DashboardHeader />
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  </div>
);

export default DashboardLayout;
