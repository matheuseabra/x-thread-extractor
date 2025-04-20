import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => (
  <div className="bg-black min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </main>
    <Footer />
  </div>
);

export default DashboardLayout;
