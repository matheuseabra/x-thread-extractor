import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="bg-black min-h-screen flex flex-col">
    <Header />
    <main className="min-h-screen flex-1 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </main>
    <Footer />
  </div>
);

export default Layout;
