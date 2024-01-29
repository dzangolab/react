interface DzangolabReactLayoutConfig {
  homeRoute?: "/" | string;
  logo?: string;
  logoAlt?: string;
  mainMenu?: {
    label: string;
    route: string;
  }[];
}

export type { DzangolabReactLayoutConfig };
