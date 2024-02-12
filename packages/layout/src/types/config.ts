interface DzangolabReactLayoutConfig {
  homeRoute?: "/" | string;
  logo?: string;
  logoAlt?: string;
  logoRoute?: string;
  mainMenu?: {
    name: string;
    route: string;
  }[];
}

export type { DzangolabReactLayoutConfig };
