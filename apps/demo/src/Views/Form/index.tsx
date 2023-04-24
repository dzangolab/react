import { ConfirmPasswordForm, LoginForm } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

import ComponentRenderer from "../../components/ComponentRenderer";

const ROUTES = [
  {
    key: 1,
    title: "Login Form",
    component: <LoginForm />,
  },
  {
    key: 2,
    title: "Confirm Password Form",
    component: <ConfirmPasswordForm />,
  },
];

const Form = () => {
  const { t } = useTranslation();

  return (
    <ComponentRenderer componentRoutes={ROUTES} title={t("header.menu.form")} />
  );
};

export default Form;
