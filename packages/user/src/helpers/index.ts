import type { DzangolabReactUserConfig } from "../types";
import type { DzangolabReactLayoutConfig } from "@dzangolab/react-layout";
import type { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

const getHomeRoute = (
  user: EmailPasswordUserType | undefined,
  layoutConfig: DzangolabReactLayoutConfig | undefined,
  userConfig: DzangolabReactUserConfig
) => {
  return user
    ? userConfig && userConfig?.routes?.home
      ? userConfig.routes.home
      : "profile"
    : layoutConfig && layoutConfig?.homeRoute
    ? layoutConfig.homeRoute
    : undefined;
};

export { getHomeRoute };
