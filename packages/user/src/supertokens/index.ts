import { AppConfig } from "@dzangolab/react-config";
import SuperTokens from "supertokens-web-js";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

const superTokens = (config: AppConfig) => {
  SuperTokens.init({
    appInfo: {
      appName: config.app.name,
      apiDomain: config.apiBaseUrl,
      apiBasePath: "/auth",
    },
    recipeList: [
      EmailPassword.init(),
      Session.init(),
      ThirdPartyEmailPassword.init(),
    ],
  });
};

export default superTokens;
