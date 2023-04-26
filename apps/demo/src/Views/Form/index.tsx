import { ConfirmPasswordForm, LoginForm } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

import DisplayComponents from "../../components/DisplayComponents";

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
    <DisplayComponents
      componentList={componentList}
      title={t("header.menu.form")}
    />
  );
};

export default Form;
