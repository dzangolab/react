import type { DzangolabReactUserConfig, UserType } from "../types";
import type { DzangolabReactLayoutConfig } from "@dzangolab/react-layout";

const USER_KEY = "user";

const getHomeRoute = (
  user: UserType | undefined,
  layoutConfig: DzangolabReactLayoutConfig | undefined,
  userConfig: DzangolabReactUserConfig
) => {
  const getUserHomeRoute = (user: UserType) => {
    if (userConfig.routes?.home) {
      return typeof userConfig.routes.home === "function"
        ? userConfig.routes?.home(user)
        : userConfig.routes.home;
    }

    return "profile";
  };

  return user ? getUserHomeRoute(user) : layoutConfig?.homeRoute;
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
