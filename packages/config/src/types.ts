interface AppConfig {
  apiBaseUrl: string;
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
}

export type { AppConfig, AppFeatures };
