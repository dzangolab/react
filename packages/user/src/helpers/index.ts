import type { DzangolabReactUserConfig, UserType } from "../types";
import type { DzangolabReactLayoutConfig } from "@dzangolab/react-layout";

const USER_KEY = "user";

const getHomeRoute = (
  user: UserType | undefined,
  layoutConfig: DzangolabReactLayoutConfig | undefined,
  userConfig: DzangolabReactUserConfig
) => {
  const getRoute = (home: string | ((userRole: string[]) => string)) => {
    if (typeof home === "function") {
      return home(user?.roles || []);
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

const setUserData = (data: UserType) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};

const getUserData = () => {
  return JSON.parse(localStorage.getItem(USER_KEY) || "");
};

const removeUserData = () => {
  localStorage.removeItem(USER_KEY);
};
export { getHomeRoute, setUserData, getUserData, removeUserData };
