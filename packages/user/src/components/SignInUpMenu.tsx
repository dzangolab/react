import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenu } from "@dzangolab/react-ui";

import { useConfig } from "../hooks";

const SignInUpMenu = () => {
  const { t } = useTranslation("user");
  const { user: userConfig } = useConfig();

  const loginRoute = {
    name: t("menu.signin"),
    route: "/login",
  };

  const signUpRoute = {
    name: t("menu.signup"),
    route: "/signup",
  };

  const routes = userConfig?.routes?.signup?.disabled
    ? [loginRoute]
    : [loginRoute, signUpRoute];

  return <ResponsiveMenu routes={routes} />;
};

export default SignInUpMenu;
