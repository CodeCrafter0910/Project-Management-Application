import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import ReactQueryProvider from "./provider/react-query-provider";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TaskSphere — Project Management Made Beautiful</title>
        <meta
          name="description"
          content="TaskSphere is a modern project management platform for teams. Manage tasks, collaborate seamlessly, and track progress with beautiful analytics."
        />
        <meta name="theme-color" content="#4f46e5" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ReactQueryProvider>
      <Outlet />
    </ReactQueryProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="glass-light rounded-2xl p-8 max-w-lg w-full text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center">
          <span className="text-2xl text-white font-bold">{message === "404" ? "404" : "!"}</span>
        </div>
        <h1 className="text-3xl font-bold text-gradient">{message}</h1>
        <p className="text-muted-foreground">{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto text-left text-xs bg-muted rounded-lg mt-4">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
