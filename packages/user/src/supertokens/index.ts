import { SUPERTOKENS_API_BASE_PATH_DEFAULT } from "@/constants";
import { AppConfig } from "@dzangolab/react-config";
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

const superTokens = (config: AppConfig) => {
  SuperTokens.init({
    appInfo: {
      appName: config.appTitle,
      apiDomain: config.apiBaseUrl,
      apiBasePath: config.apiBasePath || SUPERTOKENS_API_BASE_PATH_DEFAULT,
    },
    recipeList: [Session.init(), ThirdPartyEmailPassword.init()],
  });
};

export default superTokens;
