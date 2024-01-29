import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenu } from "@dzangolab/react-ui";
import React from "react";

interface Properties {
  orientation?: "horizontal" | "vertical";
  routes?: {
    label: string;
    route: string;
  }[];
}

const DEFAULT_ROUTES = [
  {
    label: "header.menu.home",
    route: "/",
  },
  {
    label: "header.menu.about",
    route: "/about",
  },
];

const MainMenu = (properties: Properties) => {
  const { t } = useTranslation("app");

  const { routes = DEFAULT_ROUTES, orientation = "horizontal" } = properties;

  const getTranslatedRoutes = () => {
    return routes.map(({ label, route }) => {
      return {
        label: t(label),
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
