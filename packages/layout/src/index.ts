import "./assets/css/index.css";

import {
  Copyright,
  Header,
  HeaderMenu,
  HeaderTitle,
  Layout,
  Logo,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  ToggleMenuMobile,
  Version,
} from "./components/Layout";
import {
  LayoutContext,
  LayoutProvider,
  useLayoutContext,
} from "./context/LayoutProvider";
import {
  HeaderLayout,
  SidebarHeaderLayout,
  SidebarHeaderLayoutProperties,
  SidebarOnlyLayout,
  SidebarOnlyLayoutProperties,
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

export type { DzangolabReactLayoutConfig } from "./types";

export type { SidebarHeaderLayoutProperties, SidebarOnlyLayoutProperties };
