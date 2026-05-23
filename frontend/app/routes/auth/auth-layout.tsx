import { useAuth } from "@/provider/auth-context";
import React from "react";
import { Navigate, Outlet } from "react-router";
import { Zap } from "lucide-react";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-auth flex items-center justify-center">
        <div className="flex flex-col items-center gap-5 animate-fade-in-up">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-primary opacity-30 animate-ping" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-white font-bold text-xl tracking-tight">TaskSphere</span>
            <div className="flex gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
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
