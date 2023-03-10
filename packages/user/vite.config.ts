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
        fileName: (format) => `DzangolabReactUser.${format}.js`,
        name: "@dzangolab/react-user",
      },
      rollupOptions: {
        external: [
          ...Object.keys(dependencies),
          ...Object.keys(peerDependencies),
        ],
        output: {
          exports: "named",
          globals: {
            "@dzangolab/react-config": "DzangolabReactConfig",
            "@dzangolab/react-i18n": "DzangolabReactI18n",
            "@dzangolab/react-layout": "DzangolabReactLayout",
            "@dzangolab/react-ui": "DzangolabReactUi",
            formik: "formik",
            yup: "Yup",
            react: "React",
            "react-dom": "ReactDom",
            "react-router-dom": "ReactRouterDom",
            "react-toastify": "ReactToastify",
            "react-outside-click-handler": "ReactOutsideClickHandler",
            "supertokens-web-js": "SuperTokensWebJs",
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
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  };
});
