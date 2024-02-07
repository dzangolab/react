import "./assets/css/index.css";

import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import {
  Logo,
  Copyright,
  Version,
  Layout,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  ToggleMenuMobile,
  LayoutContext,
  LayoutProvider,
  useLayoutContext,
} from "./components/Layout";
import MainMenu from "./components/MainMenu";
import SidebarLegacy from "./components/Sidebar";
import {
  BasicLayout,
  CollapsibleSidebarLayout,
  SidebarOnlyLayout,
} from "./layouts";

import type { DzangolabReactLayoutConfig } from "./types";

declare module "@dzangolab/react-config" {
  export interface AppConfig {
    layout?: DzangolabReactLayoutConfig;
  }
}

export {
  // legacy
  // components
  AppFooter,
  AppHeader,
  MainMenu,

  /**
   * @description
   * Previously `<Sidebar></Sidebar>`
   */
  SidebarLegacy,

  // layouts
  BasicLayout,
  CollapsibleSidebarLayout,

  // new
  // components
  Copyright,
  Logo,
  SidebarFooter,
  SidebarHeader,
  Sidebar,
  ToggleMenuMobile,
  Version,

  // wrapper
  Layout,

  // layouts
  SidebarOnlyLayout,

  // context
  LayoutContext,
  LayoutProvider,
  useLayoutContext,
};

export type {
  DzangolabReactLayoutConfig,
  NavGroupType,
  NavItemType,
  NavMenuItemType,
  NavMenuType,
} from "./types";
