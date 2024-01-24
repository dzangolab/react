import { LocaleSwitcher } from "@dzangolab/react-i18n";
import React, { useCallback, useState } from "react";

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
}

const AppHeader: React.FC<Properties> = (properties: Properties) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { appName, layout: layoutConfig } = useConfig();

  const parseLogoAlt = useCallback(() => {
    if (!appName) {
      return;
    }

    let logoAlt = appName.indexOf("/") === -1 ? appName : appName.split("/")[1];
    logoAlt = logoAlt.replace(/-/g, " ");

    return logoAlt[0].toUpperCase() + logoAlt.substring(1);
  }, [appName]);

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
      {logo || (
        <Logo
          src={layoutConfig?.logo}
          route={logoRoute || layoutConfig?.homeRoute}
          alt={layoutConfig?.logoAlt || parseLogoAlt()}
        />
      )}
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
