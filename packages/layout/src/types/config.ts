interface DzangolabReactLayoutConfig {
  homeRoute?: "home" | string;
  logo?: string;
  logoAlt?: string;
  mainMenu?: {
    name: string;
    route: string;
  }[];
}

export type { DzangolabReactLayoutConfig };
