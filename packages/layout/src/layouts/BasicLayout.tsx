import React from "react";

import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";

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
  isLayoutFixed?: boolean;
}

const BasicLayout: React.FC<Properties> = (properties) => {
  const {
    children,
    localSwitcher,
    logoRoute,
    menuToggle,
    mainMenuRoutes,
    userMenu,
    mainMenu,
    mainMenuOrientation,
    footer,
    header,
    isLayoutFixed,
  } = properties;

  return (
    <div className="layout basic">
      {header || (
        <AppHeader
          navStyle="left-slider"
          userMenu={userMenu}
          mainMenuRoutes={mainMenuRoutes}
          mainMenu={mainMenu}
          toggle={menuToggle}
          localeSwitcher={localSwitcher}
          logoRoute={logoRoute}
          mainMenuOrientation={mainMenuOrientation}
          isLayoutFixed={isLayoutFixed}
        />
      )}

      <main>{children}</main>

      {footer || <AppFooter isLayoutFixed={isLayoutFixed} />}
    </div>
  );
};

export default BasicLayout;
