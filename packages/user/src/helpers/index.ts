import type { DzangolabReactUserConfig, UserType } from "../types";
import type { DzangolabReactLayoutConfig } from "@dzangolab/react-layout";

const USER_KEY = "user";

const getHomeRoute = (
  user: UserType | null,
  layoutConfig: DzangolabReactLayoutConfig | undefined,
  userConfig: DzangolabReactUserConfig | undefined,
) => {
  const getUserHomeRoute = (user: UserType) => {
    if (userConfig?.routes?.home) {
      return typeof userConfig.routes.home === "function"
        ? userConfig.routes?.home(user)
        : userConfig.routes.home;
    }

    return "/";
  };

  return user ? getUserHomeRoute(user) : layoutConfig?.homeRoute;
};

const setUserData = (data: UserType) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};

const getUserData = (): UserType | null => {
  const savedUser = localStorage.getItem(USER_KEY);

  return savedUser ? JSON.parse(savedUser) : null;
};

const removeUserData = () => {
  localStorage.removeItem(USER_KEY);
};

export { getHomeRoute, getUserData, removeUserData, setUserData };
