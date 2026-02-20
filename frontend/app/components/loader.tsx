import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Loader = () => {
  const [showSlowMessage, setShowSlowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSlowMessage(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      {showSlowMessage && (
        <p className="text-sm text-muted-foreground animate-pulse text-center max-w-xs">
          Server is waking up, this may take a moment…
        </p>
      )}
    </div>
  );
};
