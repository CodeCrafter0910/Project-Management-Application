import { useAuth } from "@/provider/auth-context";
import { Logo } from "@/components/logo";
import React from "react";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-auth flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 animate-fade-in-up">
          <div className="relative flex items-center justify-center">
            <Logo className="h-24 w-[300px] relative z-10" bgColor="oklch(0.14 0.05 280)" />
            {/* Ambient glow behind the logo */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse-glow -z-10" />
          </div>
          <div className="flex gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default AuthLayout;
