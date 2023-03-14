import type { DzangolabReactUserConfig } from "../types";
import type { DzangolabReactLayoutConfig } from "@dzangolab/react-layout";
import type { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

const getHomeRoute = (
  user: EmailPasswordUserType | undefined,
  layoutConfig: DzangolabReactLayoutConfig | undefined,
  userConfig: DzangolabReactUserConfig
) => {
  const getRoute = (home: string | ((userRole: string) => string)) => {
    if (typeof home === "function") {
      return home("");
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
