interface DzangolabReactLayoutConfig {
  homeRoute?: "/" | string;
  logo?: string;
  logoAlt?: string;
  mainMenu?: {
    name: string;
    route: string;
  }[];
}

export type { DzangolabReactLayoutConfig };
