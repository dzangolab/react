import { LocaleSwitcher } from "@dzangolab/react-i18n";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import Logo from "./Logo";
import MainMenu from "./MainMenu";
import useConfig from "../hooks/useConfig";

import "../assets/css/components/app-header.css";

interface Properties {
  localeSwitcher?: React.ReactNode;
  mainMenu?: React.ReactNode;
  navStyle?: "dropdown" | "left-slider";
  toggle?: React.ReactNode;
  userMenu?: React.ReactNode;
}

const AppHeader: React.FC<Properties> = (properties: Properties) => {
  const { layout: layoutConfig } = useConfig();

  const {
    localeSwitcher = <LocaleSwitcher />,
    mainMenu = <MainMenu routes={layoutConfig?.mainMenu} />,
    navStyle = "dropdown",
    toggle = <GiHamburgerMenu style={{ height: "1.5rem" }} />,
    userMenu,
  } = properties;

  const [expanded, setExpanded] = useState<boolean>(false);

  const home =
    layoutConfig && layoutConfig?.homeRoute
      ? layoutConfig.homeRoute
      : undefined;

  let navClass = navStyle;

  if (expanded) {
    navClass += " expanded";
  }

  if (mainMenu) {
    navClass += " main-menu";
  }

  return (
    <header>
      <Logo source={layoutConfig?.logo} route={home} />
      <nav className={navClass}>
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
