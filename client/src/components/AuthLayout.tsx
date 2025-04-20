import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  belowForm?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, belowForm }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-black">
    <div className="flex items-center mb-6">
      <img
        src="/assets/tools4x-logo.png"
        alt="tools4x logo"
        className="w-10 h-10 mr-3"
      />
      <span className="text-white text-2xl font-bold tracking-tight">tools4x</span>
    </div>
    {children}
    {belowForm && <div className="mt-4 text-gray-400 text-sm">{belowForm}</div>}
  </div>
);

export default AuthLayout;
