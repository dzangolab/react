import { ConfirmPasswordForm, LoginForm } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

import ComponentList from "../../components/ComponentList";

const componentList = [
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
    <ComponentList
      componentList={componentList}
      title={t("header.menu.form")}
    />
  );
};

export default Form;
