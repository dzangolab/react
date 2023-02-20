import { configContext } from "@dzangolab/react-config";
import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenu } from "@dzangolab/react-ui";
import { useContext } from "react";

const SignInUpMenu = () => {
  const { t } = useTranslation("user");
  const appConfig = useContext(configContext);

  const loginRoute = {
    name: t("menu.signin"),
    route: "/login",
  };

  const signUpRoute = {
    name: t("menu.signup"),
    route: "/signup",
  };

  const routes = appConfig?.user?.routes?.signup?.disabled
    ? [loginRoute]
    : [loginRoute, signUpRoute];

  return <ResponsiveMenu routes={routes} />;
};

export default SignInUpMenu;
