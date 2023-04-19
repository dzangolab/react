import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenu } from "@dzangolab/react-ui";

import { ROUTES } from "../constants";
import { useConfig } from "../hooks";

const SignInUpMenu = () => {
  const { t } = useTranslation("user");
  const { user: userConfig } = useConfig();

  const loginRoute = {
    name: t("menu.signin"),
    route: userConfig.routes?.login?.path || ROUTES.LOGIN,
  };

  const signUpRoute = {
    name: t("menu.signup"),
    route: userConfig.routes?.signup?.path || ROUTES.SIGNUP,
  };

  const routes = userConfig?.routes?.signup?.disabled
    ? [loginRoute]
    : [loginRoute, signUpRoute];

  return (
    <nav className="sign-in-up-menu">
      <ResponsiveMenu routes={routes} />
    </nav>
  );
};

export default SignInUpMenu;
