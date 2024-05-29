import { AppConfig } from "@dzangolab/react-config";
import SuperTokens from "supertokens-web-js";
import EmailVerification from "supertokens-web-js/recipe/emailverification";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

import ProfileValidationClaim from "./profileValidationClaim";

import { SUPERTOKENS_API_BASE_PATH_DEFAULT } from "@/constants";

const superTokens = (config: AppConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recipeLists: Array<any> = [
    Session.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            getGlobalClaimValidators: function (input) {
              return [
                ...input.claimValidatorsAddedByOtherRecipes,
                ProfileValidationClaim.validators.isTrue(),
              ];
            },
          };
        },
      },
    }),
    ThirdPartyEmailPassword.init(
      config?.user?.supertokens?.thirdPartyEmailPasswordConfig,
    ),
  ];

  if (config.user.features?.signUp?.emailVerification) {
    recipeLists.push(EmailVerification.init());
  }

  SuperTokens.init({
    appInfo: {
      appName: config.appTitle,
      apiDomain: config.apiBaseUrl,
      apiBasePath: config.authBasePath || SUPERTOKENS_API_BASE_PATH_DEFAULT,
    },
    recipeList: recipeLists,
  });
};

export default superTokens;
