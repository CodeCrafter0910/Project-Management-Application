import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

export const Loader = () => {
  const [showSlowMessage, setShowSlowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSlowMessage(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-xl shadow-indigo-500/20">
          <Zap className="w-7 h-7 text-white" />
        </div>
        <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-primary opacity-30 animate-ping" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        {showSlowMessage && (
          <p className="text-sm text-muted-foreground animate-fade-in-up text-center max-w-xs mt-3">
            Server is waking up — this may take a moment…
          </p>
        )}
      </div>
    </div>
  );
};
