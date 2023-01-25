import { AppConfig } from "@dzangolab/react-config";
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

const superTokens = (config: AppConfig) => {
  SuperTokens.init({
    appInfo: {
      appName: config.app.name,
      apiDomain: config.apiBaseUrl,
      apiBasePath: "/auth",
    },
    recipeList: [Session.init(), ThirdPartyEmailPassword.init()],
  });
};

export default superTokens;
