interface AppConfig {
  apiBaseUrl: string;
  app: {
    logo: string;
    name: string;
    version: string;
  };
  appPort: string;
  appTitle: string;
  appVersion: string;
  copyright?: {
    holder: string;
    url: string;
  };
  features: AppFeatures;
  locales: string;
  localStorageNamespace: string;
  websiteDomain: string;
  supportedLoginProviders?: string[];
}

interface AppFeatures {
  showVersion: boolean;
}

export type { AppConfig, AppFeatures };
