import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";
import React from "react";

const Achieved = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 animate-fade-in-up">
      <div className="relative mb-8 group">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-500">
          <CheckCircle2 className="w-12 h-12 text-white" />
          <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-yellow-400 animate-pulse-glow" />
        </div>
        <div className="absolute inset-0 w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      <Card className="glass-dark border-white/10 shadow-2xl max-w-lg w-full text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
        <CardContent className="pt-10 pb-10 px-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-4">
            Achieved Milestones
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            This section is currently under construction. Soon, you'll be able to view all your completed tasks, project milestones, and team achievements in one beautiful dashboard.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Coming soon to TaskSphere
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achieved;
