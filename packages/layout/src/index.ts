import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import Copyright from "./components/Copyright";
import MainMenu from "./components/MainMenu";
import Sidebar from "./components/Sidebar";
import Version from "./components/Version";
import BasicLayout from "./layouts/BasicLayout";
import CollapsibleSidebarLayout from "./layouts/CollapsibleSidebarLayout";
import Layout from "./layouts/Layout";
import NullLayout from "./layouts/NullLayout";
import { DzangolabReactLayoutConfig } from "./types/config";

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
  MainMenu,
  NullLayout,
  Sidebar,
  Version,
};
