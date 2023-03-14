interface DzangolabReactLayoutConfig {
  homeRoute?: "home" | string;
  logo?: string;
  mainMenu: {
    name: string;
    route: string;
  }[];
}

export type { DzangolabReactLayoutConfig };
