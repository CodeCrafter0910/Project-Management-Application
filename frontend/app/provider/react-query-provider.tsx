import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth-context";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3, // retry 3 times to survive Render cold-start
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000), // 2s, 4s, 8s
      refetchOnWindowFocus: false,
    },
  },
});

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
