import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [createHtmlPlugin()],
  build: {
    outDir: "dist",
  },
  server: {
    open: true,
  },
  assetsInclude: ["**/*.html"]
});
