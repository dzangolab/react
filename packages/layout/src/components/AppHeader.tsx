import { LocaleSwitcher } from "@dzangolab/react-i18n";
import { ThemeSwitcher } from "@dzangolab/react-ui";
import React, { useState } from "react";

import { Logo } from "./Layout";
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
}

const AppHeader: React.FC<Properties> = (properties: Properties) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { layout: layoutConfig } = useConfig();

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
  } = properties;

  return (
    <header>
      {logo || <Logo route={logoRoute} />}
      <nav className={`menu ${navStyle}`} data-expanded={expanded}>
        {mainMenu || (
          <MainMenu
            routes={mainMenuRoutes || layoutConfig?.mainMenu}
            orientation={mainMenuOrientation}
          />
        )}
        {userMenu}
        {localeSwitcher || <LocaleSwitcher />}
        <ThemeSwitcher />
      </nav>
      <div className="toggle" onClick={() => setExpanded(!expanded)}>
        {toggle}
      </div>
    </header>
  );
};

export default AppHeader;
