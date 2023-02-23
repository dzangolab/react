import { configContext } from "@dzangolab/react-config";
import { LocaleSwitcher } from "@dzangolab/react-i18n";
import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import Logo from "./Logo";
import MainMenu from "./MainMenu";

import "../css/components/app-header.css";

interface Properties {
  route?: string;
  localeSwitcher?: React.ReactNode;
  mainMenu?: React.ReactNode;
  navStyle?: "dropdown" | "left-slider";
  toggle?: React.ReactNode;
  userMenu?: React.ReactNode;
}

const AppHeader: React.FC<Properties> = (properties: Properties) => {
  const appConfig = useContext(configContext);

  const {
    route = "/",
    localeSwitcher = <LocaleSwitcher />,
    mainMenu = <MainMenu routes={appConfig?.layout?.mainMenu} />,
    navStyle = "dropdown",
    toggle = <GiHamburgerMenu style={{ height: "1.5rem" }} />,
    userMenu,
  } = properties;

  const [expanded, setExpanded] = useState<boolean>(false);

  let navClass = navStyle;

  if (expanded) {
    navClass += " expanded";
  }

  return (
    <header>
      <Logo src={appConfig?.app.logo} route={route} />
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
