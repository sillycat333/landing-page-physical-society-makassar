import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import syncPostsPlugin from "./scripts/vite-plugin-sync-posts.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    syncPostsPlugin(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: "5173",
  },
});
