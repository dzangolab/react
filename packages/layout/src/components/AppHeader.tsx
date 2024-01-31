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

    return appName.replace("@", "").replace("/", " ");
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
    <header aria-expanded={expanded} className={`${navStyle}`}>
      {logo || (
        <Logo
          src={layoutConfig?.logo}
          route={logoRoute || layoutConfig?.homeRoute}
          alt={layoutConfig?.logoAlt || parseLogoAlt()}
        />
      )}
      {mainMenu || (
        <MainMenu
          routes={mainMenuRoutes || layoutConfig?.mainMenu}
          orientation={mainMenuOrientation}
        />
      )}
      {userMenu}
      {localeSwitcher || <LocaleSwitcher />}
      <div className="toggle" onClick={() => setExpanded(!expanded)}>
        {toggle}
      </div>
    </header>
  );
};

export default AppHeader;
