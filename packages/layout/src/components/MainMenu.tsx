import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenu } from "@dzangolab/react-ui";
import React from "react";

interface Properties {
  horizontal?: boolean;
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

  const { routes, horizontal = false } = properties;

  const getDefaultRoutes = () => {
    return DEFAULT_ROUTES.map(({ name, route }) => {
      return {
        name: t(name),
        route,
      };
    });
  };

  return (
    <nav className="main-menu">
      <ResponsiveMenu
        routes={routes ? routes : getDefaultRoutes()}
        horizontal={horizontal}
      />
    </nav>
  );
};

export default MainMenu;
