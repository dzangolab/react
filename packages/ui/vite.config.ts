import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

import { dependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      lib: {
        entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
        fileName: (format) => `DzangolabReactUI.${format}.js`,
        name: "@dzangolab/react-ui",
      },
      rollupOptions: {
        external: [...Object.keys(dependencies)],
        output: {
          exports: "named",
          globals: {
            react: "React",
            "@tanstack/react-table": "reactTable",
            "react-debounce-input": "reactDebounceInput",
            "react-outside-click-handler": "OutsideClickHandler",
          },
        },
      },
      target: "esnext",
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: Number(process.env.VITE_APP_PORT) || 8889,
    },
    test: {
      coverage: {
        reporter: ["text", "json", "html"],
      },
      environment: "jsdom",
      globals: true,
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  };
});
