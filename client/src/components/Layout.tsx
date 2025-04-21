import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 pb-8 w-full">{children}</main>
    <Footer />
  </div>
);

export default Layout;
