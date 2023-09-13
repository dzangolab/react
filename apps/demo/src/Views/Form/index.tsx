import { ConfirmPasswordForm, LoginForm } from "@dzangolab/react-form";

import FileAttachDemo from "./FileAttachDemo";
import { FileInputButton } from "./FileInputButton";
import { FileUploadDemo } from "./FileUpload";
import { FormWithFileInputButton } from "./FormFileInputButton";
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
    title: "pages.forms.formFileInputButton",
    component: <FormWithFileInputButton />,
  },
  {
    key: 4,
    title: "pages.forms.fileInput",
    component: <FormWithFileInput />,
  },
  {
    key: 5,
    title: "pages.forms.fileInputButton",
    component: <FileInputButton />,
  },
  {
    key: 6,
    title: "pages.forms.fileUpload",
    component: <FileUploadDemo />,
  },
  {
    key: 7,
    title: "pages.forms.fileAttach",
    component: <FileAttachDemo />,
  },
];

const Form = () => {
  return (
    <ComponentList componentList={componentList} title={"header.menu.form"} />
  );
};

export default Form;
