import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import React from "react";

const Header: React.FC = () => {
  const { user } = useAuth();
  return (
    <header className="bg-black border-b border-border">
      <div className="max-w-3xl mx-auto w-full px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center cursor-pointer">
            <span className="text-lg font-bold text-white">tools4x.pro</span>
          </a>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-2 ml-4">
            {!user && (
              <>
                <Button asChild size="sm" variant="link" className="hover:bg-black hover:text-white hover:no-underline">
                  <a href="/login">Sign In</a>
                </Button>
                <Button asChild size="sm" variant="default" className="bg-white text-black hover:bg-gray-100">
                  <a href="/signup">Sign Up</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
