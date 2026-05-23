import { Card, CardContent } from "@/components/ui/card";
import { Settings as SettingsIcon, Wrench } from "lucide-react";
import React from "react";

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 animate-fade-in-up">
      <div className="relative mb-8 group">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-500">
          <SettingsIcon className="w-12 h-12 text-white animate-spin-slow" />
          <Wrench className="absolute -bottom-2 -left-2 w-8 h-8 text-indigo-300 drop-shadow-lg" />
        </div>
        <div className="absolute inset-0 w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      <Card className="glass-dark border-white/10 shadow-2xl max-w-lg w-full text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />
        <CardContent className="pt-10 pb-10 px-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-4">
            Workspace Settings
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            This module is currently being built. You will soon be able to configure workspace preferences, manage billing, and customize permissions directly from this page.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Coming soon to TaskSphere
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
