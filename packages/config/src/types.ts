interface AppConfig {
  authBasePath?: string;
  apiBaseUrl: string;
  appName?: string;
  appPort: string;
  appTitle: string;
  appVersion: string;
  copyright?: {
    holder: string;
    url: string;
  };
  features: AppFeatures;
  websiteDomain: string;
}

interface AppFeatures {
  showVersion: boolean;
  [feature: string]: boolean;
}

export type { AppConfig, AppFeatures };
