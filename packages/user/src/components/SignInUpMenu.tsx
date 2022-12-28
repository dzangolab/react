import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenu } from "@dzangolab/react-ui";

const SignInUpMenu = () => {
  const { t } = useTranslation("user");

  const login = t("menu.signin");
  const signup = t("menu.signup");

  const routes = [
    {
      name: login,
      route: "/login",
    },
    {
      name: signup,
      route: "/signup",
    },
  ];

  return <ResponsiveMenu routes={routes} />;
};

export default SignInUpMenu;
