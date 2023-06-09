import { ConfirmPasswordForm, LoginForm } from "@dzangolab/react-form";

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
  return (
    <ComponentList componentList={componentList} title={"header.menu.form"} />
  );
};

export default Form;
