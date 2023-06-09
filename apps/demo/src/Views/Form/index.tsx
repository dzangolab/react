import { ConfirmPasswordForm, LoginForm } from "@dzangolab/react-form";

import ComponentList from "../../components/ComponentList";

const componentList = [
  {
    key: 1,
    title: "pages.forms.login",
    component: <LoginForm />,
  },
  {
    key: 2,
    title: "pages.forms.confirmPassword",
    component: <ConfirmPasswordForm />,
  },
];

const Form = () => {
  return (
    <ComponentList componentList={componentList} title={"header.menu.form"} />
  );
};

export default Form;
