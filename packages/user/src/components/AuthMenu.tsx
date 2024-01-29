import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenu } from "@dzangolab/react-ui";

import { ROUTES } from "../constants";
import { useConfig } from "../hooks";

export const AuthMenu = () => {
  const { t } = useTranslation("user");
  const { user: userConfig } = useConfig();

  const loginRoute = {
    label: t("menu.signin"),
    route: userConfig.routes?.login?.path || ROUTES.LOGIN,
  };

  const signUpRoute = {
    label: t("menu.signup"),
    route: userConfig.routes?.signup?.path || ROUTES.SIGNUP,
  };

  const routes = userConfig?.routes?.signup?.disabled
    ? [loginRoute]
    : [loginRoute, signUpRoute];

  return (
    <span className="dz-auth-menu">
      <ResponsiveMenu routes={routes} />
    </span>
  );
};
