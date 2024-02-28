import react from "@vitejs/plugin-react";
import { mergeConfig } from "vite";
import { stylexPlugin } from "vite-plugin-stylex-dev";
import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default defineConfig((configEnvironment) =>
  mergeConfig(
    viteConfig(configEnvironment),
    defineConfig({
      plugins: [react(), stylexPlugin()],
      test: {
        coverage: {
          reporter: ["text", "json", "html"],
        },
        environment: "jsdom",
        globals: true,
        setupFiles: "./setup-test.ts",
      },
    }),
  ),
);
