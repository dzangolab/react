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
        fileName: (format) => `DzangolabReactI18n.${format}.js`,
        name: "@dzangolab/react-i18n",
      },
      rollupOptions: {
        external: [
          ...Object.keys(peerDependencies),
          ...Object.keys(dependencies),
        ],
        output: {
          exports: "named",
          globals: {
            "@dzangolab/react-config": "DzangolabReactConfig",
            i18next: "I18next",
            "i18next-browser-languagedetector":
              "I18nextBrowserLanguagedetector",
            "i18next-chained-backend": "I18nextChainedBackend",
            "i18next-resources-to-backend": "I18nextResourcesToBackend",
            react: "React",
            "react-dom": "ReactDom",
            "react-i18next": "ReactI18next",
            "react-outside-click-handler": "ReactOutsideClickHandler",
          },
        },
      },
      target: "esnext",
      sourcemap: true,
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
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  };
});
