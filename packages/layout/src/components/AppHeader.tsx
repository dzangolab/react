import { configContext } from "@dzangolab/react-config";
import { LocaleSwitcher } from "@dzangolab/react-i18n";
import { UserMenu } from "@dzangolab/react-user";
import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import MainMenu from "./MainMenu";

import "../css/components/app-header.css";

interface Properties {
  localeSwitcher?: React.ReactNode;
  mainMenu?: React.ReactNode;
  navStyle?: "dropdown" | "left-slider";
  toggle?: React.ReactNode;
  userMenu?: React.ReactNode;
  logo?: React.ReactNode;
  title?: React.ReactNode;
}

const AppHeader: React.FC<Properties> = (properties: Properties) => {
  const appConfig = useContext(configContext);

  const {
    localeSwitcher = <LocaleSwitcher />,
    mainMenu = <MainMenu />,
    navStyle = "dropdown",
    toggle = <GiHamburgerMenu style={{ height: "1.5rem" }} />,
    userMenu = <UserMenu />,
    logo = (
      <a href={appConfig?.home.anon}>
        <img src={appConfig?.app.logo} alt="logo" />
      </a>
    ),
    title = "Hi, User",
  } = properties;

  const [expanded, setExpanded] = useState<boolean>(false);

  let navClass = navStyle;

  if (expanded) {
    navClass += " expanded";
  }

  return (
    <header>
      {logo ? <div className="logo">{logo}</div> : <h1>{title}</h1>}
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
