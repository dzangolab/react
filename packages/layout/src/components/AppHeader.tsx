import { LocaleSwitcher } from "@dzangolab/react-i18n";
import React, { useState } from "react";

import Logo from "./Logo";
import MainMenu from "./MainMenu";
import useConfig from "../hooks/useConfig";

interface Properties {
  localeSwitcher?: React.ReactNode;
  logo?: React.ReactNode;
  logoRoute?: string;
  mainMenu?: React.ReactNode;
  mainMenuRoutes?: {
    name: string;
    route: string;
  }[];
  mainMenuOrientation?: "horizontal" | "vertical";
  navStyle?: "dropdown" | "left-slider";
  toggle?: React.ReactNode;
  userMenu?: React.ReactNode;
  isHeaderFixed?: boolean;
}

const AppHeader: React.FC<Properties> = (properties: Properties) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { layout: layoutConfig } = useConfig();

  const home =
    layoutConfig && layoutConfig?.homeRoute
      ? layoutConfig.homeRoute
      : undefined;

  const {
    localeSwitcher,
    logoRoute,
    logo,
    mainMenuOrientation,
    mainMenu,
    navStyle = "dropdown",
    toggle = <i className="pi pi-align-justify"></i>,
    userMenu,
    mainMenuRoutes,
    isHeaderFixed,
  } = properties;

  return (
    <header className={isHeaderFixed ? "fixed-header" : ""}>
      {logo || <Logo source={layoutConfig?.logo} route={logoRoute || home} />}
      <nav className={`menu ${navStyle}`} data-expanded={expanded}>
        {mainMenu || (
          <MainMenu
            routes={mainMenuRoutes || layoutConfig?.mainMenu}
            orientation={mainMenuOrientation}
          />
        )}
        {userMenu}
        {localeSwitcher || <LocaleSwitcher />}
      </nav>
      <div className="toggle" onClick={() => setExpanded(!expanded)}>
        {toggle}
      </div>
    </header>
  );
};

export default AppHeader;
