import "./assets/css/index.css";

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
import {
  SidebarHeaderLayout,
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
  // layouts
  SidebarHeaderLayout,
  HeaderLayout,
  SidebarOnlyLayout,

  // wrapper
  Layout,

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
