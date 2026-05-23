import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode — static files load instantly, no SSR cold-start delay
  ssr: false,
} satisfies Config;
