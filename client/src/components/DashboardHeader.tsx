import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";
import { Sparkles } from "lucide-react";
import React from "react";

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="bg-black border-b border-border">
      <div className="max-w-5xl mx-auto w-full px-4 py-4 sm:px-6 lg:px-8 flex justify-end items-center">
        {/* Only user avatar and menu now */}
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.email}</span>
          <a
            href="/checkout?products=5b100806-ca38-4e9e-a33a-fa1e3930cfe7"
            className="flex items-center bg-zinc-900 border text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200 text-sm shadow"
            style={{ textDecoration: "none" }}
          >
            <span>Upgrade</span>
            <Sparkles className="h-4 w-4 ml-2" />
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url}
                    alt={user?.email || "User"}
                  />
                  <AvatarFallback>
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
