import "./assets/css/index.css";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import { Copyright, Header, HeaderMenu, HeaderTitle, Layout, LayoutContext, LayoutProvider, Logo, Sidebar, SidebarFooter, SidebarHeader, ToggleMenuMobile, Version, useLayoutContext } from "./components/Layout";
import MainMenu from "./components/MainMenu";
import SidebarLegacy from "./components/Sidebar";
import { BasicLayout, CollapsibleSidebarLayout, HeaderLayout, SidebarOnlyLayout } from "./layouts";
import type { DzangolabReactLayoutConfig } from "./types";
declare module "@dzangolab/react-config" {
    interface AppConfig {
        layout?: DzangolabReactLayoutConfig;
    }
}
export { AppFooter, AppHeader, MainMenu, 
/**
 * @description
 * Previously `<Sidebar></Sidebar>`
 */
SidebarLegacy, BasicLayout, CollapsibleSidebarLayout, Copyright, Header, HeaderMenu, HeaderTitle, Logo, SidebarFooter, SidebarHeader, Sidebar, ToggleMenuMobile, Version, Layout, HeaderLayout, SidebarOnlyLayout, LayoutContext, LayoutProvider, useLayoutContext, };
export type { DzangolabReactLayoutConfig, NavGroupType, NavItemType, NavMenuItemType, NavMenuType, } from "./types";
//# sourceMappingURL=index.d.ts.map