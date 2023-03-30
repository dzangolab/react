import { parse } from "@dzangolab/react-config";

import en from "./locales/en";
import fr from "./locales/fr";

import type { AppConfig, AppFeatures } from "@dzangolab/react-config";

const config: AppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  appPort: parse(import.meta.env.VITE_APP_PORT, "20083") as string,
  appTitle: import.meta.env.VITE_APP_TITLE as string,
  appVersion: `${import.meta.env.VITE_APP_VERSION}+${
    import.meta.env.VITE_APP_BUILD
  }` as string,
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
    resources: {
      en: en,
      fr: fr,
    },
  },
  layout: {
    logo: "/react/logo.png",
    mainMenu: [
      {
        name: "header.menu.i18n",
        route: "/i18n",
      },
      {
        name: "header.menu.layout",
        route: "/layout",
      },

      {
        name: "header.menu.ui",
        route: "/ui",
      },
      {
        name: "header.menu.user",
        route: "/user",
      },
    ],
  },
  user: {
    supportedRoles: [],
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
