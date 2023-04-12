import { LocaleSwitcher } from "@dzangolab/react-i18n";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import Logo from "./Logo";
import MainMenu from "./MainMenu";
import useConfig from "../hooks/useConfig";

import "../assets/css/components/app-header.css";

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
    toggle = <GiHamburgerMenu style={{ height: "1.5rem" }} />,
    userMenu,
  } = properties;

  return (
    <header>
      {logo}
      <div
        className={`menu-container ${navStyle}`}
        data-aria-expanded={expanded}
      >
        {mainMenu}
        {userMenu}
        {localeSwitcher}
      </div>
      <div className="toggle" onClick={() => setExpanded(!expanded)}>
        {toggle}
      </div>
    </header>
  );
};

export default AppHeader;
