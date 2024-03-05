import { fileURLToPath, URL } from "url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import { stylexPlugin } from "vite-plugin-stylex-dev";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: "/react/",
    plugins: [
      react(),
      stylexPlugin(),
      createHtmlPlugin({
        inject: {
          data: {
            themeColorDark: process.env.VITE_THEME_COLOR || "#000000",
            themeColorLight: process.env.VITE_THEME_COLOR || "#ffffff",
            title: process.env.VITE_APP_TITLE || "React Demo",
          },
        },
        minify: true,
      }),
      viteCompression({
        compressionOptions: {
          level: 9,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: Number(process.env.VITE_APP_PORT) || 20072,
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  };
});
