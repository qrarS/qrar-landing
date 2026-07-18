import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    // Served publicly through a Cloudflare tunnel: without an explicit
    // Cache-Control, Cloudflare edge-caches .css/.js for 4h and deploys
    // appear stale to visitors.
    headers: {
      "Cache-Control": "no-store",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
