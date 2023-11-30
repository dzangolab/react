import { useTranslation } from "@dzangolab/react-i18n";
import { Link } from "react-router-dom";

import { ROUTES } from "@/constants";
import { useConfig } from "@/hooks";

export const Links = () => {
  const appConfig = useConfig();
  const { t } = useTranslation("user");

  return (
    <>
      {appConfig.user?.routes?.signup?.disabled ? null : (
        <Link
          to={appConfig.user.routes?.signup?.path || ROUTES.SIGNUP}
          className="native-link"
        >
          {t("login.links.signup")}
        </Link>
      )}
      {appConfig.user?.routes?.forgetPassword?.disabled ? null : (
        <Link
          to={
            appConfig.user.routes?.forgetPassword?.path ||
            ROUTES.FORGET_PASSWORD
          }
          className="native-link"
        >
          {t("login.links.forgotPassword")}
        </Link>
      )}
    </>
  );
};
