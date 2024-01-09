import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenu } from "@dzangolab/react-ui";
import React from "react";

interface Properties {
  orientation?: "horizontal" | "vertical";
  routes?: {
    name: string;
    route: string;
  }[];
}

const DEFAULT_ROUTES = [
  {
    name: "header.menu.home",
    route: "/",
  },
  {
    name: "header.menu.about",
    route: "/about",
  },
];

const MainMenu = (properties: Properties) => {
  const { t } = useTranslation("app");

  const { routes = DEFAULT_ROUTES, orientation = "horizontal" } = properties;

  const getTranslatedRoutes = () => {
    return routes.map(({ name, route }) => {
      return {
        name: t(name),
        route,
      };
    });
  };

  return (
    <ResponsiveMenu
      className="main-menu"
      routes={getTranslatedRoutes()}
      orientation={orientation}
    />
  );
};

export default MainMenu;
