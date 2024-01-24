import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon } from "@dzangolab/react-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { thirdPartySignInAndUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { ROUTES } from "../constants";
import { useConfig, useUser } from "../hooks";
import { UserType } from "../types";

const AuthGoogleCallback = () => {
  const { t } = useTranslation("user");
  const { user: userConfig } = useConfig();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const loginPath = userConfig.routes?.login?.path || ROUTES.LOGIN;

  const authCallback = async () => {
    try {
      const response = await thirdPartySignInAndUp();

      if (response.status === "OK") {
        const user: unknown = response.user;
        await setUser(user as UserType);
        toast.success(`${t("authGoogleCallback.email.success")}`);
      } else {
        toast.error(`${t("authGoogleCallback.email.error")}`);
        navigate(loginPath);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        toast.error(err.message);
      } else {
        toast.error(`${t("authGoogleCallback.message.error")}`);
      }

      navigate(loginPath);
    }
  };

  useEffect(() => {
    authCallback();
  }, []);

  return <LoadingIcon />;
};

export default AuthGoogleCallback;
