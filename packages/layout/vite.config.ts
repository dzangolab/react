import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

import { dependencies, peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      lib: {
        entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
        fileName: (format) => `DzangolabReactLayout.${format}.js`,
        name: "@dzangolab/react-layout",
      },
      rollupOptions: {
        external: [
          ...Object.keys(peerDependencies),
          ...Object.keys(dependencies),
        ],
        output: {
          exports: "named",
          globals: {
            "@dzangolab/react-i18n": "DzangolabReactI18n",
            "@dzangolab/react-config": "DzangolabReactConfig",
            "@dzangolab/react-ui": "DzangolabReactUi",
            "@dzangolab/react-user": "DzangolabReactUser",
            react: "React",
            "react-dom": "ReactDom",
            "react-router-dom": "ReactRouterDom",
          },
        },
      },
      target: "esnext",
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@/": new URL("./src/", import.meta.url).pathname,
      },
    },
    server: {
      port: Number(process.env.VITE_APP_PORT) || 8889,
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  };
});
