import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenu } from "@dzangolab/react-ui";

import { useConfig } from "../hooks";

const SignInUpMenu = () => {
  const { t } = useTranslation("user");
  const { user: userConfig } = useConfig();

  const loginRoute = {
    name: t("menu.signin"),
    route: userConfig.routes?.login?.path || "/login",
  };

  const signUpRoute = {
    name: t("menu.signup"),
    route: userConfig.routes?.signup?.path || "/signup",
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
