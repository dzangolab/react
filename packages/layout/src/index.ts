import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import Copyright from "./components/Copyright";
import Logo from "./components/Logo";
import MainMenu from "./components/MainMenu";
import Sidebar from "./components/Sidebar";
import Version from "./components/Version";
import Layout from "./Layout";
import BasicLayout from "./layouts/BasicLayout";
import CollapsibleSidebarLayout from "./layouts/CollapsibleSidebarLayout";
import NullLayout from "./NullLayout";

import type { DzangolabReactLayoutConfig } from "./types";

import "./assets/css/index.css";

declare module "@dzangolab/react-config" {
  export interface AppConfig {
    layout?: DzangolabReactLayoutConfig;
  }
}

export {
  AppFooter,
  AppHeader,
  BasicLayout,
  CollapsibleSidebarLayout,
  Copyright,
  Layout,
  Logo,
  MainMenu,
  NullLayout,
  Sidebar,
  Version,
};

export type { DzangolabReactLayoutConfig } from "./types";
