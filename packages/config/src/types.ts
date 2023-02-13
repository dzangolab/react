interface AppConfig {
  apiBaseUrl: string;
  app: {
    logo: string;
    name: string;
    version: string;
  };
  appContext: "USER" | "ADMIN";
  appPort: string;
  appTitle: string;
  appVersion: string;
  copyright?: {
    holder: string;
    url: string;
  };
  features: AppFeatures;
  home: {
    anon: string;
    auth: string;
  };
  locales: string;
  localStorageNamespace: string;
  websiteDomain: string;
  supportedLoginProviders?: string[];
}

interface AppFeatures {
  showVersion: boolean;
}

export type { AppConfig, AppFeatures };
