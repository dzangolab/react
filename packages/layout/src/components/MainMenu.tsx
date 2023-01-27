import { ResponsiveMenu } from "@dzangolab/react-ui";
import React from "react";

interface Properties {
  direction?: "column";
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
  const { routes = DEFAULT_ROUTES, direction } = properties;

  return (
    <ResponsiveMenu cssClass="mainMenu" routes={routes} direction={direction} />
  );
};

export default MainMenu;
