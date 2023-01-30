import { ResponsiveMenu } from "@dzangolab/react-ui";
import React from "react";

interface Properties {
  displayColumn?: boolean;
  routes?: {
    name: string;
    route: string;
  }[];
}

const DEFAULT_ROUTES = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "About",
    route: "/about",
  },
];

const MainMenu = (properties: Properties) => {
  const { routes = DEFAULT_ROUTES, displayColumn } = properties;

  return (
    <ResponsiveMenu
      cssClass="mainMenu"
      routes={routes}
      displayColumn={displayColumn}
    />
  );
};

export default MainMenu;
