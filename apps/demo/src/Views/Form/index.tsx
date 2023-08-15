import { ConfirmPasswordForm, LoginForm } from "@dzangolab/react-form";

import { FormWithFileInput } from "./FormWithFileInput";
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
  {
    key: 3,
    title: "pages.forms.confirmPassword",
    component: <FormWithFileInput />,
  },
];

const Form = () => {
  return (
    <ComponentList componentList={componentList} title={"header.menu.form"} />
  );
};

export default Form;
