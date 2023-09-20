import { AppConfig } from "@dzangolab/react-config";
import SuperTokens from "supertokens-web-js";
import EmailVerification from "supertokens-web-js/recipe/emailverification";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { SUPERTOKENS_API_BASE_PATH_DEFAULT } from "@/constants";

const superTokens = (config: AppConfig) => {
  SuperTokens.init({
    appInfo: {
      appName: config.appTitle,
      apiDomain: config.apiBaseUrl,
      apiBasePath: config.authBasePath || SUPERTOKENS_API_BASE_PATH_DEFAULT,
    },
    recipeList: [
      Session.init(),
      EmailVerification.init(),
      ThirdPartyEmailPassword.init(),
    ],
  });
};

export default superTokens;
