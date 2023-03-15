import type { DzangolabReactUserConfig, UserType } from "../types";
import type { DzangolabReactLayoutConfig } from "@dzangolab/react-layout";

const getHomeRoute = (
  user: UserType | undefined,
  layoutConfig: DzangolabReactLayoutConfig | undefined,
  userConfig: DzangolabReactUserConfig
) => {
  const getRoute = (home: string | ((userRole: string[]) => string)) => {
    if (typeof home === "function") {
      return home(user?.role || []);
    }

    return home;
  };

  return user
    ? userConfig && userConfig?.routes?.home
      ? getRoute(userConfig.routes.home)
      : "profile"
    : layoutConfig && layoutConfig?.homeRoute
    ? layoutConfig.homeRoute
    : undefined;
};

export { getHomeRoute };
