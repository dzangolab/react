import "./assets/css/index.css";

import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import {
  Copyright,
  Header,
  HeaderMenu,
  HeaderTitle,
  Layout,
  LayoutContext,
  LayoutProvider,
  Logo,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  ToggleMenuMobile,
  Version,
  useLayoutContext,
} from "./components/Layout";
import MainMenu from "./components/MainMenu";
import SidebarLegacy from "./components/Sidebar";
import {
  BasicLayout,
  CollapsibleSidebarLayout,
  CollapsibleSidebarHeaderLayout,
  HeaderLayout,
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
  CollapsibleSidebarHeaderLayout,

  // new
  // components
  Copyright,
  Header,
  HeaderMenu,
  HeaderTitle,
  Logo,
  SidebarFooter,
  SidebarHeader,
  Sidebar,
  ToggleMenuMobile,
  Version,

  // wrapper
  Layout,

  // layouts
  HeaderLayout,
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
