import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      lib: {
        entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
        fileName: (format) => `DzangolabReactConfig.${format}.js`,
        name: "@dzangolab/react-config",
      },
      rollupOptions: {
        external: [],
        output: {
          exports: "named",
          globals: {},
        },
      },
      target: "esnext",
    },
    plugins: [],
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
  };
});
