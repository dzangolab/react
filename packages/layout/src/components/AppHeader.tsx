import { LocaleSwitcher } from "@dzangolab/react-i18n";
import React, { useState } from "react";

import Logo from "./Logo";
import MainMenu from "./MainMenu";
import useConfig from "../hooks/useConfig";

interface Properties {
  localeSwitcher?: React.ReactNode;
  logo?: React.ReactNode;
  mainMenu?: React.ReactNode;
  navStyle?: "dropdown" | "left-slider";
  toggle?: React.ReactNode;
  userMenu?: React.ReactNode;
}

const AppHeader: React.FC<Properties> = (properties: Properties) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { layout: layoutConfig } = useConfig();

  const home =
    layoutConfig && layoutConfig?.homeRoute
      ? layoutConfig.homeRoute
      : undefined;

  const {
    localeSwitcher = <LocaleSwitcher />,
    logo = <Logo source={layoutConfig?.logo} route={home} />,
    mainMenu = <MainMenu routes={layoutConfig?.mainMenu} />,
    navStyle = "dropdown",
    toggle = <i className="pi pi-align-justify"></i>,
    userMenu,
  } = properties;

  return (
    <header>
      {logo}
      <nav className={`menu ${navStyle}`} data-expanded={expanded}>
        {mainMenu}
        {userMenu}
        {localeSwitcher}
      </nav>
      <div className="toggle" onClick={() => setExpanded(!expanded)}>
        {toggle}
      </div>
    </header>
  );
};

export default AppHeader;
