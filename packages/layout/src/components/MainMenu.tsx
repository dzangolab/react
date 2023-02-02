import { ResponsiveMenu } from "@dzangolab/react-ui";
import React from "react";

interface Properties {
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
  const { routes = DEFAULT_ROUTES } = properties;

  return <ResponsiveMenu cssClass="main-menu" routes={routes} />;
};

export default MainMenu;
