import { LocaleSwitcher } from "@dzangolab/react-i18n";
import { UserMenu } from "@dzangolab/react-user";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import MainMenu from "./MainMenu";

import type { AppConfig } from "@dzangolab/react-config";

import "../css/components/app-header.css";

interface Properties {
  config: AppConfig;
  localeSwitcher?: React.ReactNode;
  mainMenu?: React.ReactNode;
  navStyle?: "dropdown" | "left-slider";
  toggle?: React.ReactNode;
  userMenu?: React.ReactNode;
}

const AppHeader: React.FC<Properties> = (properties: Properties) => {
  const { config } = properties;

  const {
    localeSwitcher = <LocaleSwitcher />,
    mainMenu = <MainMenu />,
    navStyle = "dropdown",
    toggle = <GiHamburgerMenu style={{ height: "1.5rem" }} />,
    userMenu = <UserMenu />,
  } = properties;

  const [expanded, setExpanded] = useState<boolean>(false);

  let navClass = navStyle;

  if (expanded) {
    navClass += " expanded";
  }

  return (
    <header>
      <div className="logo">
        <a href={config.home.anon}>
          <img src={config.app.logo} alt="logo" />
        </a>
      </div>
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
