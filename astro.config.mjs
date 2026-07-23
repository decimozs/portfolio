import { fileURLToPath } from "node:url";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sessionDrivers } from "astro/config";

const isDevServer = process.argv.some((arg) => arg.includes("dev"));

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: isDevServer ? undefined : cloudflare(),
  session: {
    driver: sessionDrivers.lruCache(),
  },
  site: "https://marlonmartin.binspire.space",
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/agent") && !page.includes("/api"),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
