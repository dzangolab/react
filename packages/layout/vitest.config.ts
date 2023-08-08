import react from "@vitejs/plugin-react";
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      coverage: {
        reporter: ["text", "json", "html"],
      },
      environment: "jsdom",
      globals: true,
      setupFiles: "./setup-test.ts",
    },
  })
);
