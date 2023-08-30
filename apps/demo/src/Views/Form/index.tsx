import { ConfirmPasswordForm, LoginForm } from "@dzangolab/react-form";

import { FormWithFileInput } from "./FormWithFileInput";
import ComponentList from "../../components/ComponentList";
import { FileUploadDemo } from "./FileUpload";

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
    title: "pages.forms.fileInput",
    component: <FormWithFileInput />,
  },
  {
    key: 4,
    title: "pages.forms.fileUpload",
    component: <FileUploadDemo />,
  },
];

const Form = () => {
  return (
    <ComponentList componentList={componentList} title={"header.menu.form"} />
  );
};

export default Form;
