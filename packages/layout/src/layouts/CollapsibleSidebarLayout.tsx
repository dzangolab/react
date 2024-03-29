import { ResponsiveMenu } from "@dzangolab/react-ui";
import React from "react";

import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";

interface Properties {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  localSwitcher?: React.ReactNode;
  menuToggle?: React.ReactNode;
  mainMenuRoutes?: {
    name: string;
    route: string;
    icon?: React.ReactNode;
  }[];
  mainMenuOrientation?: "horizontal" | "vertical";
  userMenu?: React.ReactNode;
  mainMenu?: React.ReactNode;
  logoRoute?: string;
  sidebar?: React.ReactNode;
  displaySidebarMenuIcon?: boolean;
  displaySidebar?: boolean;
  fixed?: boolean;
}

export const CollapsibleSidebarLayout: React.FC<Properties> = (properties) => {
  const {
    sidebar,
    children,
    footer,
    header,
    mainMenuRoutes,
    displaySidebarMenuIcon,
    displaySidebar = true,
    localSwitcher,
    logoRoute,
    mainMenu,
    mainMenuOrientation,
    menuToggle,
    userMenu,
    fixed = true,
  } = properties;

  return (
    <div className={`layout collapsible ${fixed ? "fixed" : ""}`.trimEnd()}>
      {header || (
        <AppHeader
          navStyle="left-slider"
          mainMenuRoutes={mainMenuRoutes}
          localeSwitcher={localSwitcher}
          logoRoute={logoRoute}
          mainMenu={mainMenu}
          mainMenuOrientation={mainMenuOrientation}
          toggle={menuToggle}
          userMenu={userMenu}
        />
      )}
      {displaySidebar ? (
        <>
          {sidebar || (
            <Sidebar>
              <ResponsiveMenu
                routes={mainMenuRoutes || []}
                orientation="vertical"
                displayIcon={displaySidebarMenuIcon}
              />
            </Sidebar>
          )}
        </>
      ) : null}
      <main>{children}</main>
      {footer || <AppFooter />}
    </div>
  );
};
