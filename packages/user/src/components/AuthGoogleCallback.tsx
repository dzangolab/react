import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon } from "@dzangolab/react-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { thirdPartySignInAndUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { DEFAULT_PATHS } from "@/constants";

import { useConfig, useUser } from "../hooks";
import { verifySessionRoles } from "../supertokens/helpers";

import type { UserType } from "../types";

export const AuthGoogleCallback = () => {
  const { t } = useTranslation("user");
  const config = useConfig();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const loginPath = config.customPaths?.login || DEFAULT_PATHS.LOGIN;

  const authCallback = async () => {
    try {
      const response = await thirdPartySignInAndUp();

      if (response.status === "OK") {
        const user: unknown = response.user;

        if (
          user &&
          config &&
          (await verifySessionRoles(config.supportedRoles))
        ) {
          await setUser(user as UserType);

          toast.success(`${t("authGoogleCallback.email.success")}`);
        } else {
          toast.error(t("login.messages.permissionDenied"));

          navigate(loginPath);
        }
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
