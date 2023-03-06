import { parse } from "@dzangolab/react-config";

import type { AppConfig, AppFeatures } from "@dzangolab/react-config";

const config: AppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  app: {
    logo: "/logo.png",
    name: import.meta.env.VITE_APP_TITLE as string,
    version: `${import.meta.env.VITE_APP_VERSION}-${
      import.meta.env.VITE_APP_BUILD
    }` as string,
  },
  appPort: parse(import.meta.env.VITE_APP_PORT, "20083") as string,
  appTitle: import.meta.env.VITE_APP_TITLE as string,
  appVersion: `${import.meta.env.VITE_APP_VERSION}-${
    import.meta.env.VITE_APP_BUILD
  }` as string,
  appContext: "USER",
  copyright: {
    holder: import.meta.env.VITE_APP_COPYRIGHT_HOLDER as string,
    url: import.meta.env.VITE_APP_COPYRIGHT_HOLDER_URL as string,
  },
  features: {
    showVersion: parse(
      import.meta.env.VITE_FEATURES_SHOW_VERSION as string,
      true
    ) as boolean,
  } as AppFeatures,
  i18n: {
    appendNamespaceToCIMode: true,
    debug: true,
    defaultNS: "app",
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
  },
  locales: (import.meta.env.VITE_LOCALES || "en:English,fr:Français") as string,
  localStorageNamespace: (import.meta.env.VITE_LOCALE_STORAGE_NAMESPACE ||
    "__app_") as string,
  user: {
    redirectTo: {
      appName: "",
      appURL: "",
    },
  },
  websiteDomain: (window.location.protocol +
    "//" +
    window.location.host) as string,
};

const feature = (name: keyof AppFeatures): boolean => {
  return config.features[name];
};

export default config;

export { config, feature };
